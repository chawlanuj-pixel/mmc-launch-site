#!/usr/bin/env node
/* Static MySQL/MariaDB compatibility lint for the Command Centre PHP (everything is tested on SQLite only).
 *   node tools/mysql-lint.mjs            human-readable report, exit 1 when any BREAKS-ON-MYSQL finding exists
 *   node tools/mysql-lint.mjs --json     machine-readable
 *   node tools/mysql-lint.mjs --all      also show RISK findings (default shows BREAKS-ON-MYSQL, LIKELY-BREAKS and RISK)
 * It reads public/api/**, public/forms/*.php. It never connects to a database and never edits a file.
 * It needs the `php` binary only to print the SQL each migration returns for the mysql driver.
 * A clean run does NOT prove MySQL compatibility: it only catches the patterns listed in command-center/MYSQL-AUDIT.md. */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FOUND_ROWS_SET = (() => { try { return /ATTR_FOUND_ROWS/.test(fs.readFileSync(path.join(ROOT, 'public/api/_lib/bootstrap.php'), 'utf8')); } catch (e) { return false; } })();
const API = path.join(ROOT, 'public', 'api');
const argv = process.argv.slice(2);
const findings = [];
const add = (sev, rule, file, line, msg, fix = '') => findings.push({ sev, rule, file: path.relative(ROOT, file), line, msg, fix });

/* ---------------------------------------------------------------- files */
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!['_data', 'node_modules'].includes(e.name)) walk(p, out); } else if (e.name.endsWith('.php')) out.push(p);
  }
  return out;
}
const phpFiles = [...walk(API), ...walk(path.join(ROOT, 'public', 'forms'))].sort();

/* ------------------------------------------------- PHP string literals */
function literals(src) {
  const out = []; let i = 0, line = 1; const n = src.length;
  const nl = (s) => { for (const c of s) if (c === '\n') line++; };
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '*') { const j = src.indexOf('*/', i + 2); const e = j < 0 ? n : j + 2; nl(src.slice(i, e)); i = e; continue; }
    if ((c === '/' && d === '/') || c === '#') { if (c === '#' && d === '[') { /* attribute */ } const j = src.indexOf('\n', i); i = j < 0 ? n : j; continue; }
    if (c === "'" || c === '"') {
      const start = i, startLine = line; i++;
      while (i < n && src[i] !== c) { if (src[i] === '\\') { if (src[i + 1] === '\n') line++; i += 2; continue; } if (src[i] === '\n') line++; i++; }
      const raw = src.slice(start + 1, i); i++;
      out.push({ raw, quote: c, line: startLine, value: unescape(raw, c), end: i });
      continue;
    }
    if (c === '\n') line++;
    i++;
  }
  return out;
}
function unescape(raw, q) {
  if (q === "'") return raw.replace(/\\(\\|')/g, '$1');
  return raw.replace(/\\(\\|"|n|t|r|\$|0)/g, (m, x) => ({ '\\': '\\', '"': '"', n: '\n', t: '\t', r: '\r', $: '$', 0: '\0' }[x]));
}
const sqlish = (v) => /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|REPLACE|WITH)\b/i.test(v) || (/\bSELECT\b/i.test(v) && /\bFROM\b/i.test(v)) || (/\bWHERE\b/i.test(v) && /[?=]/.test(v) && /\b(AND|OR|IN|LIKE|IS|ORDER|LIMIT)\b/i.test(v)) || /\bORDER BY\b|\bGROUP BY\b|\bLIKE\s+\?/i.test(v);

/* ------------------------------------------------------ reserved words */
// MySQL 8.0 and MariaDB 10.x keywords that are reserved and could plausibly be used as a column or table name.
const RESERVED = new Set(('accessible add all alter analyze and as asc asensitive before between bigint binary blob both by call cascade case change char character check collate column condition constraint continue convert create cross cube cume_dist current_date current_role current_time current_timestamp current_user cursor database databases day_hour day_microsecond day_minute day_second dec decimal declare default delayed delete dense_rank desc describe deterministic distinct distinctrow div double drop dual each else elseif empty enclosed escaped except exists exit explain false fetch first_value float float4 float8 for force foreign from fulltext function general generated get grant group grouping groups having high_priority hour_microsecond hour_minute hour_second if ignore ignore_server_ids in index infile inner inout insensitive insert int int1 int2 int3 int4 int8 integer intersect interval into io_after_gtids io_before_gtids is iterate join json_table key keys kill lag last_value lateral lead leading leave left like limit linear lines load localtime localtimestamp lock long longblob longtext loop low_priority master_bind master_heartbeat_period master_ssl_verify_server_cert match maxvalue mediumblob mediumint mediumtext middleint minute_microsecond minute_second mod modifies natural not no_write_to_binlog nth_value ntile null numeric of offset on optimize optimizer_costs option optionally or order out outer outfile over page_checksum parse_vcol_expr partition percent_rank precision primary procedure purge range rank read reads read_write real recursive ref_system_id references regexp release rename repeat replace require resignal restrict return returning revoke right rlike row rows row_number schema schemas second_microsecond select sensitive separator set show signal slow smallint spatial specific sql sqlexception sqlstate sqlwarning sql_big_result sql_calc_found_rows sql_small_result ssl starting stats_auto_recalc stats_persistent stats_sample_pages stored straight_join system table terminated then tinyblob tinyint tinytext to trailing trigger true undo union unique unlock unsigned update usage use using utc_date utc_time utc_timestamp values varbinary varchar varcharacter varying virtual when where while window with write xor year_month zerofill').split(/\s+/));
// Allowed in MySQL/MariaDB without quoting (listed so nobody "fixes" them): at, status, type, value, position, mode, source, kind, label, scope, state, comment, round, version, log, size, name, text, date, time, data, format, level, action, body, field, conditions, checks, settings, trigger_type, read_at, owner, section.

/* ---------------------------------------------------------- migrations */
const tmpPhp = path.join(fs.mkdtempSync(path.join(process.env.TMPDIR || '/tmp', 'mmclint-')), 'dump.php');
fs.writeFileSync(tmpPhp, `<?php\nforeach (glob($argv[1] . '/_migrations/*.php') as $f) { try { echo json_encode([basename($f), (require $f)($argv[2])]), "\\n"; } catch (Throwable $e) { echo json_encode([basename($f), 'ERROR ' . $e->getMessage()]), "\\n"; } }\n`);
let migrations = [];
try {
  const raw = execFileSync('php', [tmpPhp, API, 'mysql'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  migrations = raw.trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
} catch (e) { console.error('php not available or migration dump failed: ' + e.message); }
fs.rmSync(path.dirname(tmpPhp), { recursive: true, force: true });

function outerFrom(sql) {   // is there a FROM outside any parentheses and quotes?
  let t = sql.replace(/'(?:[^']|'')*'/g, "''"), prev;
  do { prev = t; t = t.replace(/\([^()]*\)/g, ' '); } while (t !== prev);
  return /\bFROM\b/i.test(t);
}
const tables = {};   // name -> { cols: {name: {type, len, bytes, nullable, hasDefault, unsigned}}, indexes: [{cols, unique, name}], fks: [] }
const typeBytes = (t) => { const m = /^(?:VAR)?CHAR\((\d+)\)/i.exec(t); return m ? { len: +m[1], bytes: +m[1] * 4 } : null; };
function splitTop(s) { const out = []; let d = 0, cur = '', q = null; for (const c of s) { if (q) { cur += c; if (c === q) q = null; continue; } if (c === "'" || c === '"') { q = c; cur += c; continue; } if (c === '(') d++; if (c === ')') d--; if (c === ',' && d === 0) { out.push(cur.trim()); cur = ''; } else cur += c; } if (cur.trim()) out.push(cur.trim()); return out; }
function parseColumn(def) {
  const m = /^(`?\w+`?)\s+([A-Za-z]+(?:\([^)]*\))?(?:\s+UNSIGNED)?)(.*)$/is.exec(def); if (!m) return null;
  const name = m[1].replace(/`/g, ''), type = m[2].replace(/\s+/g, ' '), rest = m[3];
  const tb = typeBytes(type);
  return { name, type, len: tb?.len ?? null, bytes: tb?.bytes ?? null, nullable: !/NOT NULL/i.test(rest) && !/PRIMARY KEY/i.test(rest), hasDefault: /\bDEFAULT\b/i.test(rest) || /AUTO_INCREMENT/i.test(rest), unsigned: /UNSIGNED/i.test(type), unique: /\bUNIQUE\b/i.test(rest), pk: /PRIMARY KEY/i.test(rest), rest };
}
const migFile = (name) => path.join(API, '_migrations', name);
const lineOfStmt = (name, idx) => 1 + idx; // statement index, not a source line: migrations are arrays of statements
for (const [mname, stmts] of migrations) {
  if (typeof stmts === 'string') { add('BREAKS-ON-MYSQL', 'migration-load', migFile(mname), 1, `Migration could not be loaded for the mysql driver: ${stmts}`); continue; }
  stmts.forEach((sql, idx) => {
    const where = `${mname} statement ${idx + 1}`;
    const s = sql.trim();
    let m;
    if ((m = /^CREATE TABLE (?:IF NOT EXISTS )?`?(\w+)`?\s*\(([\s\S]*)\)\s*(ENGINE[\s\S]*)?$/i.exec(s))) {
      const t = { cols: {}, indexes: [], fks: [], file: mname };
      tables[m[1]] = t;
      if (RESERVED.has(m[1].toLowerCase())) add('BREAKS-ON-MYSQL', 'reserved-table', migFile(mname), idx + 1, `${where}: table name "${m[1]}" is a reserved word.`, `Rename it or quote it as \`${m[1]}\` everywhere.`);
      if (!/ENGINE=InnoDB/i.test(s)) add('RISK', 'no-engine', migFile(mname), idx + 1, `${where}: CREATE TABLE ${m[1]} has no ENGINE/CHARSET tail, so it uses the database default (MyISAM/latin1 on some hosts).`, 'Append the same $tail used by the other migrations.');
      for (const item of splitTop(m[2])) {
        if (/^(PRIMARY|UNIQUE|FOREIGN|KEY|INDEX|CONSTRAINT|FULLTEXT|CHECK)\b/i.test(item)) {
          let k;
          if ((k = /^UNIQUE(?:\s+(?:KEY|INDEX))?\s*(?:\w+\s*)?\(([^)]*)\)/i.exec(item))) t.indexes.push({ cols: k[1].split(',').map((x) => x.trim().replace(/`/g, '')), unique: true, where });
          else if ((k = /^FOREIGN KEY\s*\((\w+)\)\s*REFERENCES\s+(\w+)\s*\((\w+)\)(.*)$/i.exec(item))) t.fks.push({ col: k[1], ref: k[2], refcol: k[3], rest: k[4], where });
          else if ((k = /^PRIMARY KEY\s*\(([^)]*)\)/i.exec(item))) t.indexes.push({ cols: k[1].split(',').map((x) => x.trim()), unique: true, pk: true, where });
          continue;
        }
        const c = parseColumn(item); if (!c) { add('RISK', 'unparsed', migFile(mname), idx + 1, `${where}: could not parse column definition "${item.slice(0, 60)}".`); continue; }
        t.cols[c.name] = c;
        if (RESERVED.has(c.name.toLowerCase())) add('BREAKS-ON-MYSQL', 'reserved-column', migFile(mname), idx + 1, `${where}: column ${m[1]}.${c.name} is a reserved word and is used unquoted.`, `Rename the column (e.g. ${c.name}_x) and update every query.`);
        if (/^(TINY|MEDIUM|LONG)?(TEXT|BLOB)/i.test(c.type) && /\bDEFAULT\b/i.test(c.rest)) add('BREAKS-ON-MYSQL', 'text-default', migFile(mname), idx + 1, `${where}: ${m[1]}.${c.name} is ${c.type} with a DEFAULT (MySQL 5.7 and MariaDB < 10.2 reject it).`, 'Remove the DEFAULT and write the value from PHP.');
        if (c.unique) t.indexes.push({ cols: [c.name], unique: true, where });
        if (c.pk && c.bytes) t.indexes.push({ cols: [c.name], unique: true, pk: true, where });
      }
    } else if ((m = /^CREATE (UNIQUE )?INDEX (\w+) ON (\w+)\s*\(([^)]*)\)/i.exec(s))) {
      const t = tables[m[3]];
      if (!t) { add('BREAKS-ON-MYSQL', 'index-before-table', migFile(mname), idx + 1, `${where}: index ${m[2]} on ${m[3]} which does not exist yet.`); return; }
      t.indexes.push({ cols: m[4].split(',').map((x) => x.trim().replace(/\(\d+\)$/, '')), unique: !!m[1], where, name: m[2] });
      for (const col of m[4].split(',').map((x) => x.trim())) { const c = t.cols[col.replace(/\(\d+\)$/, '')]; if (c && /TEXT|BLOB/i.test(c.type) && !/\(\d+\)$/.test(col)) add('BREAKS-ON-MYSQL', 'text-index', migFile(mname), idx + 1, `${where}: index on TEXT/BLOB column ${m[3]}.${col} without a prefix length.`, `Index ${col}(190) or use VARCHAR.`); }
    } else if ((m = /^ALTER TABLE (\w+) ADD COLUMN (.*)$/is.exec(s))) {
      const t = tables[m[1]]; if (!t) { add('BREAKS-ON-MYSQL', 'alter-before-table', migFile(mname), idx + 1, `${where}: ALTER TABLE ${m[1]} but the table is not created by an earlier migration.`); return; }
      const c = parseColumn(m[2]); if (c) {
        t.cols[c.name] = c;
        if (RESERVED.has(c.name.toLowerCase())) add('BREAKS-ON-MYSQL', 'reserved-column', migFile(mname), idx + 1, `${where}: column ${m[1]}.${c.name} is a reserved word.`);
        if (!c.nullable && !c.hasDefault) add('LIKELY-BREAKS', 'add-notnull-nodefault', migFile(mname), idx + 1, `${where}: ADD COLUMN ${m[1]}.${c.name} NOT NULL without DEFAULT fails on a table that already has rows in strict mode.`, 'Add DEFAULT or make it NULL.');
      }
    } else if ((m = /^ALTER TABLE (\w+) RENAME TO (\w+)/i.exec(s))) { tables[m[2]] = tables[m[1]]; delete tables[m[1]]; }
    else if ((m = /^DROP TABLE (?:IF EXISTS )?(\w+)/i.exec(s))) {
      for (const [tn, t] of Object.entries(tables)) for (const fk of t.fks) if (fk.ref === m[1] && tn !== m[1]) add('BREAKS-ON-MYSQL', 'drop-referenced', migFile(mname), idx + 1, `${where}: DROP TABLE ${m[1]} while ${tn}.${fk.col} has a foreign key to it (MySQL error 3730/1217).`, 'Drop the child first, or SET FOREIGN_KEY_CHECKS=0 around it.');
      delete tables[m[1]];
    }
    if (/^INSERT INTO\s+\w+\s*\([^)]*\)\s*SELECT\b/i.test(s) && !outerFrom(s)) add('LIKELY-BREAKS', 'select-no-from', migFile(mname), idx + 1, `${where}: INSERT ... SELECT ... WHERE without FROM (MySQL 5.7 and older MariaDB need FROM DUAL).`, 'Append " FROM DUAL" after the select list.');
    if (/\bCAST\s*\([^)]*\bAS\s+(INTEGER|TEXT|REAL)\b/i.test(s)) add('BREAKS-ON-MYSQL', 'cast-type', migFile(mname), idx + 1, `${where}: CAST AS INTEGER/TEXT/REAL is not valid in MySQL.`, 'Use AS SIGNED / AS CHAR / AS DECIMAL(18,2).');
    if (/;\s*\S/.test(s.replace(/'(?:[^']|'')*'/g, "''"))) add('LIKELY-BREAKS', 'multi-statement', migFile(mname), idx + 1, `${where}: more than one SQL statement in a single string (PDO::exec on MySQL accepts it only without emulation limits; keep one statement per array item).`);
    // backslash inside a quoted SQL literal: MySQL treats it as an escape, SQLite does not
    const lits = s.match(/'(?:[^']|'')*'/g) || [];
    if (lits.some((l) => l.includes('\\'))) add('LIKELY-BREAKS', 'backslash-in-literal', migFile(mname), idx + 1, `${where}: a quoted string contains a backslash; MySQL reads it as an escape character, SQLite as text, so the stored value differs.`, 'Remove the backslash from the seed text, or double it for MySQL only.');
    if (/\bDROP TABLE\b/i.test(s) || /\bALTER TABLE\b/i.test(s) || /^CREATE\b/i.test(s)) { /* DDL auto-commits on MySQL; migrate.php runs statements one by one */ }
  });
  // second pass: indexes and foreign keys for this migration
}
for (const [tn, t] of Object.entries(tables)) {
  for (const ix of t.indexes) {
    let bytes = 0; let ok = true;
    for (const cn of ix.cols) { const c = t.cols[cn]; if (!c) continue; if (c.bytes) bytes += c.bytes; else if (/BIGINT/i.test(c.type)) bytes += 8; else if (/INT/i.test(c.type)) bytes += 4; else if (/TEXT|BLOB/i.test(c.type)) ok = false; }
    if (!ok) continue;
    if (bytes > 3072) add('BREAKS-ON-MYSQL', 'index-too-long', migFile(t.file), 1, `Index on ${tn}(${ix.cols.join(', ')}) is ${bytes} bytes with utf8mb4; the InnoDB limit is 3072.`, 'Shorten the VARCHARs or use a prefix length.');
    else if (bytes > 767) add('RISK', 'index-767', migFile(t.file), 1, `Index on ${tn}(${ix.cols.join(', ')}) is ${bytes} bytes with utf8mb4 (> 767). Fine on MySQL 5.7+/8 and MariaDB 10.2+ (DYNAMIC rows), an error 1071 on older servers.`, 'Confirm the server version, or shorten the columns.');
  }
  for (const fk of t.fks) {
    const a = t.cols[fk.col], pt = tables[fk.ref], b = pt?.cols[fk.refcol];
    if (!pt) add('BREAKS-ON-MYSQL', 'fk-order', migFile(t.file), 1, `${tn}.${fk.col} references ${fk.ref}, which is not created before it.`);
    else if (a && b && (a.type.replace(/ UNSIGNED/i, '') !== b.type.replace(/ UNSIGNED/i, '').replace(/ AUTO_INCREMENT.*/i, '') || a.unsigned !== b.unsigned)) add('BREAKS-ON-MYSQL', 'fk-type', migFile(t.file), 1, `${tn}.${fk.col} (${a.type}) and ${fk.ref}.${fk.refcol} (${b.type}) differ in type or sign (MySQL error 3780).`);
    if (/ON DELETE SET NULL/i.test(fk.rest) && a && !a.nullable) add('BREAKS-ON-MYSQL', 'fk-setnull-notnull', migFile(t.file), 1, `${tn}.${fk.col} is NOT NULL but its foreign key says ON DELETE SET NULL (MySQL error 1830).`);
  }
}

const colTypes = {};   // column name -> set of 'text' | 'num'
for (const [tn, t] of Object.entries(tables)) {
  let bytes = 0;
  for (const [cn, c] of Object.entries(t.cols)) {
    const kind = /CHAR|TEXT|BLOB|DATE|TIME/i.test(c.type) ? 'text' : 'num'; (colTypes[cn] ??= new Set()).add(kind);
    if (c.bytes) bytes += c.bytes + 2; else if (/BIGINT/i.test(c.type)) bytes += 8; else if (/INT/i.test(c.type)) bytes += 4; else if (/DOUBLE/i.test(c.type)) bytes += 8; else if (/DECIMAL/i.test(c.type)) bytes += 8; else if (/TEXT|BLOB/i.test(c.type)) bytes += 12;
  }
  if (bytes > 65535) add('BREAKS-ON-MYSQL', 'row-size', migFile(t.file), 1, `Table ${tn} declares ${bytes} bytes per row with utf8mb4; MySQL's limit is 65535 (error 1118).`, 'Turn the longest VARCHARs into TEXT.');
}

/* ------------------------------------------------------ PHP source scan */
const COLS = {}; for (const [tn, t] of Object.entries(tables)) COLS[tn] = t.cols;
const allColNames = new Set(); for (const t of Object.values(tables)) for (const c of Object.keys(t.cols)) allColNames.add(c);
const LEN_HELPERS = { mb_substr: 'arg3', cap_s: 'arg2:255', cap_first: 'arg3:255', rs: 'arg2:255', crm_str: 'arg2:255', aq_s: 'arg2', job_str: 'arg2', p_str: 'arg2', substr: 'arg3' };

function bracketArray(src, start) {   // src[start] === '[' ; returns end index (exclusive)
  let d = 0, q = null;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
    if (c === "'" || c === '"') { q = c; continue; }
    if (c === '[') d++; else if (c === ']') { d--; if (d === 0) return i + 1; }
  }
  return -1;
}
function splitPhpTop(s) { const out = []; let d = 0, cur = '', q = null; for (let i = 0; i < s.length; i++) { const c = s[i]; if (q) { cur += c; if (c === '\\') { cur += s[++i] ?? ''; continue; } if (c === q) q = null; continue; } if (c === "'" || c === '"') { q = c; cur += c; continue; } if ('([{'.includes(c)) d++; if (')]}'.includes(c)) d--; if (c === ',' && d === 0) { out.push(cur); cur = ''; } else cur += c; } if (cur.trim()) out.push(cur); return out; }
const lineAt = (src, idx) => src.slice(0, idx).split('\n').length;

function boundedLen(expr) {   // the largest string length this PHP expression can have, or null when unknown
  const e = expr.trim();
  if (/^(null|true|false)$/i.test(e)) return 0;
  if (/^\(int\)|^\(float\)|^\d+$|^intval\(|^(int)\s/.test(e)) return 0;
  if (/^now\(\)$/.test(e)) return 19;
  if (/^gmdate\(\s*'Y-m-d H:i:s'/.test(e)) return 19;
  if (/^gmdate\(/.test(e)) return 25;
  if (/^\$(t|now|pn|tt|ts|when)$/.test(e)) return 19;   // the codebase's naming for a timestamp taken from now()
  if (/^hash\(\s*'sha256'/.test(e)) return 64;
  if (/^bin2hex\(\s*random_bytes\(\s*(\d+)\s*\)\s*\)$/.test(e)) return 2 * +/random_bytes\(\s*(\d+)/.exec(e)[1];
  let m;
  if ((m = /^'((?:[^'\\]|\\.)*)'$/s.exec(e))) return m[1].length;
  if ((m = /^"((?:[^"\\$]|\\.)*)"$/s.exec(e))) return m[1].length;
  // helper(…, N) possibly wrapped in ?: / ?? / strtolower etc.
  let best = null;
  const re = /\b(mb_substr|cap_s|cap_first|rs|crm_str|aq_s|job_str|p_str|substr)\s*\(/g;
  while ((m = re.exec(e))) {
    // find the matching paren, take the last top-level argument that is a number
    let d = 0, i = m.index + m[0].length - 1, j = i; for (; j < e.length; j++) { if (e[j] === '(') d++; else if (e[j] === ')') { d--; if (d === 0) break; } }
    const args = splitPhpTop(e.slice(i + 1, j));
    const kind = LEN_HELPERS[m[1]]; let n = null;
    if (m[1] === 'mb_substr' || m[1] === 'substr') n = /^\s*\d+\s*$/.test(args[2] ?? '') ? +args[2] : null;
    else if (m[1] === 'cap_first') n = /^\s*\d+\s*$/.test(args[2] ?? '') ? +args[2] : 255;
    else { const a = args[1]; n = a && /^\s*\d+\s*$/.test(a) ? +a : (kind.includes(':') ? +kind.split(':')[1] : null); }
    if (n !== null && (best === null || n > best)) best = n;
  }
  return best;
}

for (const file of phpFiles) {
  const src = fs.readFileSync(file, 'utf8');
  const rel = path.relative(API, file);
  const isMig = rel.startsWith('_migrations');
  const lits = literals(src);
  const lineText = src.split('\n');

  /* literal-level checks */
  for (const L of lits) {
    const v = L.value; const sql = sqlish(v);
    if (/ESCAPE\s*'\\'/i.test(v)) add('BREAKS-ON-MYSQL', 'escape-backslash', file, L.line, `LIKE ... ESCAPE '\\' : MySQL treats the backslash as an escape inside the string, so the clause is a syntax error. SQLite accepts it.`, `Use ESCAPE '!' and escape with str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $s) as index.php does.`);
    if (!sql && !/ESCAPE/i.test(v)) continue;
    if (/\b(strftime|julianday|date\s*\(\s*'now'|datetime\s*\(|sqlite_master|sqlite_version|randomblob|\bGLOB\b|WITHOUT ROWID|\btypeof\s*\(|\btotal\s*\()/i.test(v) && !/db_driver\(\)/.test(lineText[L.line - 1] || '') && !/sqlite/i.test(lineText[L.line - 1] || '')) add('BREAKS-ON-MYSQL', 'sqlite-function', file, L.line, `SQLite-only SQL: ${(/\b(strftime|julianday|datetime|sqlite_master|GLOB|typeof|total|randomblob)/i.exec(v) || [''])[0]}`, 'Compute in PHP, or branch on db_driver().');
    if (/\bINSERT\s+OR\s+(REPLACE|IGNORE)\b|\bON CONFLICT\b|\bREPLACE\s+INTO\b|\bRANDOM\(\)|\bAUTOINCREMENT\b|\bPRAGMA\b/i.test(v) && !/db_driver\(\)|sqlite/i.test(lineText[L.line - 1] || '') && !isMig) add('BREAKS-ON-MYSQL', 'sqlite-syntax', file, L.line, `SQLite-only syntax: ${(/INSERT\s+OR\s+\w+|ON CONFLICT|REPLACE\s+INTO|RANDOM\(\)|AUTOINCREMENT|PRAGMA/i.exec(v) || [''])[0]}`, 'Use select-then-insert/update in PHP, or INSERT ... ON DUPLICATE KEY with a driver branch.');
    if (sql && !isMig && Object.keys(tables).length) {
      const known = new Set([...Object.keys(tables), 'migrations', 'dual', 'select', 'information_schema', 'sqlite_master']);
      for (const tm of v.matchAll(/(?<![$\w])(?:FROM|JOIN|INTO|UPDATE)\s+([a-z_][a-z0-9_]*)\b/gi)) {
        const tn = tm[1].toLowerCase(); if (known.has(tn) || /^(set|values|select|where|the|a|an)$/.test(tn)) continue;
        if (!/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|WITH)\b/i.test(v) && !/\bSELECT\b/i.test(v)) continue;
        add('BREAKS-ON-MYSQL', 'unknown-table', file, L.line, `SQL refers to table "${tn}", which no migration creates (or a later migration drops). The query fails on every database.`, 'Remove the statement or add the table in a migration.');
      }
    }
    if (/\bgroup_concat\s*\(/i.test(v)) add('BREAKS-ON-MYSQL', 'group-concat', file, L.line, 'group_concat() takes a different separator syntax in MySQL (GROUP_CONCAT(x SEPARATOR \',\')).', 'Fetch rows and implode() in PHP.');
    if (sql && /'\s*\|\|\s*|\|\|\s*'|\w\s*\|\|\s*\w/.test(v.replace(/'[^']*'/g, "''")) || (sql && /\|\|/.test(v) && !/\bOR\b.*\|\|/.test(v))) { if (/\|\|/.test(v)) add('BREAKS-ON-MYSQL', 'concat-operator', file, L.line, "String concatenation with || (MySQL reads it as logical OR unless PIPES_AS_CONCAT is set).", 'Use CONCAT(a, b).'); }
    if (/\bON DUPLICATE KEY\b/i.test(v)) add('RISK', 'mysql-only-upsert', file, L.line, 'ON DUPLICATE KEY UPDATE exists only on MySQL; the SQLite test run cannot execute it.', 'Branch on db_driver() or use select-then-write.');
    if (/\bNOW\(\)|\bCURDATE\(\)|\bCURRENT_TIMESTAMP\b|\bUNIX_TIMESTAMP\(/i.test(v) && sql) add('RISK', 'db-clock', file, L.line, 'Database clock used; the app stores UTC strings from PHP gmdate(). MySQL NOW() follows the session time zone.', 'Pass gmdate() as a bound parameter.');
    if (/\bCAST\s*\([^)]*\bAS\s+(INTEGER|TEXT|REAL)\b/i.test(v)) add('BREAKS-ON-MYSQL', 'cast-type', file, L.line, 'CAST AS INTEGER/TEXT/REAL is not valid in MySQL.', 'Use AS SIGNED / AS CHAR / AS DECIMAL(18,2).');
    if (/\b(LIMIT|OFFSET)\s+\?/i.test(v)) add('RISK', 'bound-limit', file, L.line, 'LIMIT/OFFSET with a bound parameter. Works with native prepares (ATTR_EMULATE_PREPARES=false) only because the string is coerced; breaks if emulation is ever switched on.', 'Interpolate (int) $n instead of binding it.');
    if (/\bIN\s*\(\s*SELECT\b[^()]*\bLIMIT\b/i.test(v)) add('BREAKS-ON-MYSQL', 'in-subquery-limit', file, L.line, 'IN (SELECT ... LIMIT n) is not supported by MySQL (error 1235).', 'Wrap it: IN (SELECT id FROM (SELECT ... LIMIT n) x).');
    if (/^\s*DELETE\b[\s\S]*\b(ORDER BY|LIMIT)\b/i.test(v) && !/\(\s*SELECT\b/i.test(v)) add('RISK', 'delete-limit', file, L.line, 'DELETE ... ORDER BY/LIMIT is MySQL-only (SQLite needs a build flag).', 'Select the ids first, then DELETE ... WHERE id IN (...).');
    // UPDATE/DELETE reading from the target table in a subquery (error 1093)
    let mm;
    if ((mm = /^\s*(?:UPDATE|DELETE\s+FROM)\s+(\w+)\b/i.exec(v))) {
      const t = mm[1]; const sub = new RegExp(`\\(\\s*SELECT\\b[^()]*\\bFROM\\s+${t}\\b`, 'i');
      if (sub.test(v) && !new RegExp(`\\(\\s*SELECT\\b[^()]*\\bFROM\\s*\\(\\s*SELECT`, 'i').test(v)) add('BREAKS-ON-MYSQL', 'update-same-table', file, L.line, `UPDATE/DELETE on ${t} with a subquery that reads ${t} (MySQL error 1093).`, `Wrap the subquery in a derived table: (SELECT x FROM (SELECT ... FROM ${t} ...) AS d).`);
    }
    if (/^\s*INSERT\s+INTO\s+\w+\s*\([^)]*\)\s*SELECT\b/i.test(v) && !outerFrom(v)) add('LIKELY-BREAKS', 'select-no-from', file, L.line, 'INSERT ... SELECT without FROM (needs FROM DUAL on MySQL 5.7 / older MariaDB).', 'Append FROM DUAL.');
    if (/\bWHERE\b[^"']*\b(\w+\.)?\w+\s*=\s*"[^"]*"/.test(v) && sql) add('RISK', 'double-quoted-string', file, L.line, 'Double quotes inside SQL: a string in MySQL, an identifier in SQLite.', "Use single quotes.");
    // ONLY_FULL_GROUP_BY (heuristic)
    if ((mm = /^\s*SELECT\b([\s\S]*?)\bFROM\b([\s\S]*?)\bGROUP BY\b([\s\S]*?)(?:\bHAVING\b|\bORDER BY\b|\bLIMIT\b|$)/i.exec(v))) {
      const items = splitTop(mm[1]).map((x) => x.trim()); const grp = mm[3].toLowerCase();
      for (const it of items) {
        if (/\b(COUNT|SUM|MIN|MAX|AVG|GROUP_CONCAT|ANY_VALUE)\s*\(/i.test(it)) continue;
        const alias = /\s+(?:AS\s+)?(\w+)\s*$/i.exec(it)?.[1]?.toLowerCase(); const expr = it.replace(/\s+(?:AS\s+)?\w+\s*$/i, '').toLowerCase().trim();
        if (/^\d+$|^'.*'$|^\?$/.test(expr)) continue;
        if (grp.includes(expr) || (alias && new RegExp(`\\b${alias}\\b`).test(grp)) || grp.includes(it.toLowerCase())) continue;
        add('RISK', 'full-group-by', file, L.line, `Selected expression "${it.slice(0, 70)}" is not in GROUP BY and not aggregated (ONLY_FULL_GROUP_BY is on by default in MySQL 5.7+/8).`, 'Add it to GROUP BY or wrap in MIN()/MAX()/ANY_VALUE().');
        break;
      }
    }
    // SELECT DISTINCT ... ORDER BY a column that is not selected (MySQL 5.7.5+/8 error 3065)
    if ((mm = /^\s*SELECT\s+DISTINCT\b([\s\S]*?)\bFROM\b[\s\S]*?\bORDER BY\b([\s\S]*?)(?:\bLIMIT\b|$)/i.exec(v))) {
      const sel = splitTop(mm[1]).map((x) => x.trim().toLowerCase()); const names = new Set();
      for (const it of sel) { names.add(it.replace(/\s+(?:as\s+)?\w+$/i, '').trim()); const al = /\s+(?:as\s+)?(\w+)$/i.exec(it); if (al) names.add(al[1]); names.add(it); names.add(it.replace(/^\w+\./, '')); }
      for (const ob of splitTop(mm[2])) { const t = ob.trim().replace(/\s+(asc|desc)$/i, '').toLowerCase(); if (t && !names.has(t) && !names.has(t.replace(/^\w+\./, ''))) { add('LIKELY-BREAKS', 'distinct-orderby', file, L.line, `SELECT DISTINCT ... ORDER BY ${t} where ${t} is not in the select list (MySQL error 3065 under ONLY_FULL_GROUP_BY).`, 'Select the column too, or drop DISTINCT and use GROUP BY.'); break; } }
    }
    if (sql) for (const cm of v.replace(/'(?:[^'\\]|\\.)*'/g, "''").matchAll(/(?<![\w$])(?:\w+\.)?([a-z_][a-z0-9_]*)\s*(=|<>|!=|>=|<=|<|>)\s*(-?\d+)(?![\d.\w])/gi)) {
      const cn = cm[1].toLowerCase(); const ts = colTypes[cn]; if (!ts || ts.has('num') || cn === 'limit' || cn === 'offset') continue;
      add('RISK', 'text-vs-int', file, L.line, `Column "${cn}" is text in every table that has it but is compared with the number ${cm[3]}. SQLite compares by type affinity, MySQL converts the text to a number ('abc' = 0 is true).`, `Quote it: ${cn} ${cm[2]} '${cm[3]}'.`);
    }
    // SUM/AVG numeric-string result
    if (/^\s*SELECT\b/i.test(v) && /\bSUM\s*\(/i.test(v)) add('RISK', 'sum-returns-string', file, L.line, 'SUM() returns DECIMAL, which PDO hands back as a string on MySQL (SQLite gives a number). JSON consumers and === comparisons see "5" instead of 5.', 'Cast in PHP: (int) $row[\'x\'] / (float).');
    // reserved words that are valid as identifiers only when quoted
    if (sql) {
      const stripped = v.replace(/'(?:[^'\\]|\\.)*'/g, "''");
      for (const w of ['rank', 'key', 'keys', 'condition', 'usage', 'groups', 'window', 'function', 'lead', 'lag', 'empty', 'system', 'row', 'rows', 'cube', 'over', 'interval', 'read', 'write', 'range', 'return', 'release', 'rename', 'schema', 'repeat', 'optimize']) {
        const re = new RegExp(`(?:^|[\\s,(])(?:\\w+\\.)?${w}(?=[\\s,)=<>]|$)`, 'i');
        if (re.test(stripped) && allColNames.has(w)) add('BREAKS-ON-MYSQL', 'reserved-identifier', file, L.line, `"${w}" is a reserved word and is a column name in the schema.`, 'Rename the column or quote it with backticks (backticks do not work in SQLite < 3.x? they do, SQLite accepts them).');
      }
    }
  }

  /* insert('table', [...]) length analysis */
  const reIns = /\binsert\(\s*(['"])(\w+)\1\s*,\s*(\[|\$\w+\s*\+\s*\[|\[)/g; let im;
  const reIns2 = /\binsert\(\s*(['"])(\w+)\1\s*,/g;
  while ((im = reIns2.exec(src))) {
    const table = im[2]; const cols = COLS[table]; if (!cols) continue;
    let arrStart = src.indexOf('[', im.index + im[0].length - 1 + 0); if (arrStart < 0 || arrStart - (im.index + im[0].length) > 3) {
      // insert('t', $row): analyse the nearest earlier "$row = [ ... ]"
      const vm = /^\s*(\$\w+)\s*[,)]/.exec(src.slice(im.index + im[0].length)); if (!vm) continue;
      const decl = [...src.slice(0, im.index).matchAll(new RegExp('\\' + vm[1] + '\\s*=\\s*\\[', 'g'))].pop(); if (!decl) continue;
      arrStart = decl.index + decl[0].length - 1;
    }
    const arrEnd = bracketArray(src, arrStart); if (arrEnd < 0) continue;
    const body = src.slice(arrStart + 1, arrEnd - 1);
    for (const part of splitPhpTop(body)) {
      const km = /^\s*(['"])(\w+)\1\s*=>\s*([\s\S]*)$/.exec(part); if (!km) continue;
      const col = km[2], expr = km[3].trim(), c = cols[col]; const line = lineAt(src, arrStart + body.indexOf(part));
      if (!c) { add('BREAKS-ON-MYSQL', 'unknown-column', file, line, `insert('${table}') writes column "${col}" which no migration creates.`); continue; }
      if (c.len) {
        const b = boundedLen(expr);
        if (b !== null && b > c.len) add('BREAKS-ON-MYSQL', 'varchar-overflow', file, line, `insert('${table}') column ${col} is VARCHAR(${c.len}) but the value is limited to ${b} characters. In strict mode MySQL refuses the whole row ("Data too long").`, `Limit it to ${c.len}: mb_substr(<value>, 0, ${c.len}).`);
        else if (b === null && !/^\$\w+$/.test(expr) && argv.includes('--all')) add('RISK', 'varchar-unbounded', file, line, `insert('${table}') column ${col} is VARCHAR(${c.len}) and the value (${expr.slice(0, 60).replace(/\s+/g, ' ')}) is not visibly limited.`, `Wrap in mb_substr(..., 0, ${c.len}) unless the source is already shorter.`);
      }
      if (/TINYINT|^INT|BIGINT/i.test(c.type) && (/^!|^\(bool\)|^!empty|^empty\(|^isset\(/.test(expr) || (/(===|!==|&&|\|\|)/.test(expr) && !/\?/.test(expr))) && !/\s\?\s/.test(expr)) add('LIKELY-BREAKS', 'bool-into-int', file, line, `insert('${table}') column ${col} (${c.type}) receives a PHP boolean (${expr.slice(0, 50)}). PDO sends false as '' which MySQL strict mode rejects for integer columns.`, 'Use ( ... ) ? 1 : 0.');
      if (!c.nullable && !c.hasDefault && /^null$/i.test(expr)) add('BREAKS-ON-MYSQL', 'null-into-notnull', file, line, `insert('${table}') writes NULL into NOT NULL column ${col}.`);
    }
    // NOT NULL without default columns missing from the insert
    const given = new Set([...body.matchAll(/(['"])(\w+)\1\s*=>/g)].map((x) => x[2]));
    if (!/\+\s*\[|\]\s*\+|array_merge/.test(src.slice(Math.max(0, im.index - 5), arrEnd + 25)) && !/\$\w+\s*\+\s*\[/.test(src.slice(im.index, arrStart))) {
      const missing = Object.values(cols).filter((c) => !c.nullable && !c.hasDefault && !c.pk && c.name !== 'id' && !given.has(c.name)).map((c) => c.name);
      if (missing.length && !/\b\w+\s*\+\s*\[/.test(src.slice(arrEnd, arrEnd + 12))) add('LIKELY-BREAKS', 'insert-missing-notnull', file, lineAt(src, im.index), `insert('${table}') does not set NOT NULL column(s) without a default: ${missing.join(', ')} (strict mode: error 1364).`, 'Add the column(s) to the array, or give them a DEFAULT in a new migration.');
    }
  }

  /* line-level checks */
  lineText.forEach((ln, i) => {
    const code = ln.replace(/\/\/.*$/, '');
    if (!FOUND_ROWS_SET && /->rowCount\(\)/.test(code) && /\bUPDATE\b/i.test(code.slice(0, code.indexOf('->rowCount')).split(/q\(/).pop() || '') ) add('LIKELY-BREAKS', 'rowcount', file, i + 1, 'rowCount() after UPDATE: MySQL returns rows CHANGED, not rows matched, unless PDO::MYSQL_ATTR_FOUND_ROWS is set. Re-saving identical values reads as "not found".', 'Set PDO::MYSQL_ATTR_FOUND_ROWS => true in bootstrap.php db() (one fix for every use).');
    if (/\]\s*(===|!==)\s*(1|0|'1'|'0'|true|false)\b/.test(code) && !isMig) add('RISK', 'strict-compare-db', file, i + 1, 'Strict comparison of a row value with a number or boolean. MySQL native prepares return ints for INT columns but strings for DECIMAL/SUM/AVG and for results of text-protocol queries.', 'Cast first: (int) $row[\'x\'] === 1.');
    if (/\bEMULATE_PREPARES\b/.test(code) && /true/.test(code)) add('RISK', 'emulate-prepares-on', file, i + 1, 'Emulated prepares change how bound ints in LIMIT and booleans behave.');
    if (/\binTransaction\b|\bbeginTransaction\b/.test(code) && /CREATE|ALTER|DROP/i.test(code)) add('RISK', 'ddl-in-transaction', file, i + 1, 'DDL inside a transaction auto-commits on MySQL.');
    if (/\bmysqli_|\bmysql_/.test(code)) add('RISK', 'mysqli', file, i + 1, 'Direct driver call.');
  });
}

/* ------------------------------------------------------------- report */
const order = { 'BREAKS-ON-MYSQL': 0, 'LIKELY-BREAKS': 1, RISK: 2 };
const seen = new Set();
const uniq = findings.filter((f) => { const k = `${f.rule}|${f.file}|${f.line}|${f.msg}`; if (seen.has(k)) return false; seen.add(k); return true; })
  .sort((a, b) => order[a.sev] - order[b.sev] || a.file.localeCompare(b.file) || a.line - b.line);
if (argv.includes('--json')) console.log(JSON.stringify(uniq, null, 2));
else {
  const counts = { 'BREAKS-ON-MYSQL': 0, 'LIKELY-BREAKS': 0, RISK: 0 };
  let cur = '';
  for (const f of uniq) {
    counts[f.sev]++;
    if (f.sev === 'RISK' && argv.includes('--quiet')) continue;
    if (f.file !== cur) { cur = f.file; console.log('\n' + cur); }
    console.log(`  ${f.sev.padEnd(15)} ${String(f.line).padStart(5)}  [${f.rule}] ${f.msg}${f.fix ? '\n' + ' '.repeat(28) + 'fix: ' + f.fix : ''}`);
  }
  console.log(`\nTotals: ${counts['BREAKS-ON-MYSQL']} BREAKS-ON-MYSQL, ${counts['LIKELY-BREAKS']} LIKELY-BREAKS, ${counts.RISK} RISK (${phpFiles.length} PHP files, ${migrations.length} migrations)`);
  console.log('Nothing here ran against MySQL. See command-center/MYSQL-AUDIT.md for what static analysis cannot show.');
}
process.exit(uniq.some((f) => f.sev === 'BREAKS-ON-MYSQL') ? 1 : 0);
