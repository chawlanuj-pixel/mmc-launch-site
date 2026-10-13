<?php
/* Form receiver for mondaymarketing.company (self-hosted, no third party).
 * Every site form posts JSON here (see public/assets/mmc-forms.js). The submission is emailed to FORM_TO.
 * Needs PHP with mail() enabled (standard on Hostinger shared hosting). If mail() is unavailable the script
 * answers 500 and the browser falls back to opening a pre-filled email, so a lead is never lost. */

const FORM_TO   = 'anuj@mondaymarketing.company';
const FORM_FROM = 'no-reply@mondaymarketing.company';   // must be an address on this domain so mail is accepted and not spam-filtered
const MAX_BYTES = 20000;
const MAX_PER_HOUR = 12;                                  // per visitor IP

// Never let a PHP notice or warning leak into the JSON answer the browser parses.
ini_set('display_errors', '0');

// Secrets live in config.php (not in git, denied to browsers by forms/.htaccess).
if (is_file(__DIR__ . '/config.php')) require_once __DIR__ . '/config.php';
const RECAPTCHA_MIN_SCORE = 0.3;                          // v3 score floor: lenient on purpose, a real person should never be refused
const RECAPTCHA_ACTIONS = ['mmc_form', 'mmc_register'];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

// Google reCAPTCHA verification. Returns the decoded answer, or null when Google could not be reached (then we do not block).
function recaptcha_verify(string $token, string $ip): ?array {
  $post = http_build_query(['secret' => RECAPTCHA_SECRET, 'response' => $token, 'remoteip' => $ip]);
  $url = 'https://www.google.com/recaptcha/api/siteverify';
  if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => $post, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 5, CURLOPT_CONNECTTIMEOUT => 3]);
    $out = curl_exec($ch);   // no curl_close(): it has had no effect since PHP 8.0 and is deprecated in 8.5
  } else {
    $ctx = stream_context_create(['http' => ['method' => 'POST', 'header' => "Content-Type: application/x-www-form-urlencoded\r\n", 'content' => $post, 'timeout' => 5]]);
    $out = @file_get_contents($url, false, $ctx);
  }
  if ($out === false || $out === null || $out === '') return null;
  $j = json_decode((string) $out, true);
  return is_array($j) ? $j : null;
}

function reply(int $code, array $body): void { http_response_code($code); echo json_encode($body); exit; }

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(405, ['ok' => false, 'error' => 'POST only']);

// Same-site posts only: the browser always sends an Origin (or at least a Referer) for a form post from our pages.
// A request with neither is a script talking to this endpoint directly, so it is refused.
$origin  = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$ours = '#^https://(www\.)?mondaymarketing\.company(/|$)#i';
if ($origin === '' && $referer === '') reply(403, ['ok' => false, 'error' => 'origin']);
if ($origin !== '' && !preg_match('#^https://(www\.)?mondaymarketing\.company$#i', $origin)) reply(403, ['ok' => false, 'error' => 'origin']);
if ($origin === '' && !preg_match($ours, $referer)) reply(403, ['ok' => false, 'error' => 'origin']);

$raw = file_get_contents('php://input', false, null, 0, MAX_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BYTES) reply(413, ['ok' => false, 'error' => 'too large']);
$data = json_decode($raw, true);
if (!is_array($data)) reply(400, ['ok' => false, 'error' => 'bad json']);

// Honeypot: real visitors never fill this hidden field.
// Every honeypot name any form on the site uses: a filled one is a bot, answer 200 so it does not retry, send nothing.
foreach (['_hp', 'company_website', 'company_url', 'website_url', 'hp'] as $trap) { if (!empty($data[$trap])) reply(200, ['ok' => true]); }

// Light rate limit per IP (file based, no database).
$ip = preg_replace('/[^0-9a-fA-F:\.]/', '', $_SERVER['REMOTE_ADDR'] ?? 'x');
$dir = sys_get_temp_dir() . '/mmc-forms';
@mkdir($dir, 0700, true);
$f = $dir . '/' . md5($ip) . '.json';
$now = time();
$hits = is_file($f) ? (json_decode((string) @file_get_contents($f), true) ?: []) : [];
$hits = array_values(array_filter($hits, fn($t) => $t > $now - 3600));
if (count($hits) >= MAX_PER_HOUR) reply(429, ['ok' => false, 'error' => 'rate']);
$hits[] = $now;
@file_put_contents($f, json_encode($hits), LOCK_EX);

// reCAPTCHA: once a secret is configured every post needs a token Google confirms for our own site. A refusal answers 403 'captcha'
// so the browser opens its pre-filled email fallback: a real person can still reach us, a script cannot.
$token = (string) ($data['_rc'] ?? '');
unset($data['_rc']);
if (defined('RECAPTCHA_SECRET') && RECAPTCHA_SECRET !== '') {
  if ($token === '' || strlen($token) > 4096) reply(403, ['ok' => false, 'error' => 'captcha']);
  $v = recaptcha_verify($token, $ip);
  if ($v !== null) {                                       // null = Google unreachable: do not lose the lead
    if (empty($v['success'])) reply(403, ['ok' => false, 'error' => 'captcha']);
    $host = strtolower((string) ($v['hostname'] ?? ''));
    if ($host !== '' && !preg_match('#^(www\.)?mondaymarketing\.company$#', $host)) reply(403, ['ok' => false, 'error' => 'captcha']);
    if (isset($v['action']) && !in_array($v['action'], RECAPTCHA_ACTIONS, true)) reply(403, ['ok' => false, 'error' => 'captcha']);
    if (isset($v['score']) && (float) $v['score'] < RECAPTCHA_MIN_SCORE) reply(403, ['ok' => false, 'error' => 'captcha']);
  }
}

function clean($v): string {
  if (is_array($v)) $v = implode(', ', array_map('clean', $v));
  $v = (string) $v;
  $v = str_replace(["\r", "\0"], '', $v);
  return mb_substr($v, 0, 2000);
}
function header_safe(string $v): string { return trim(preg_replace('/[\r\n]+/', ' ', $v)); }

$email = filter_var(trim((string) ($data['email'] ?? $data['workEmail'] ?? $data['work_email'] ?? '')), FILTER_VALIDATE_EMAIL) ?: '';
$name  = header_safe(clean($data['name'] ?? ''));
$src   = header_safe(clean($data['source'] ?? $data['_page'] ?? 'website'));

$subject = '[MMC website] ' . ($name !== '' ? $name . ' · ' : '') . $src;

// Optional `_subject` (used by the white-label registration page): control chars and newlines stripped, max 120 chars, prefixed '[MMC] '.
if (isset($data['_subject']) && is_string($data['_subject'])) {
  $s = trim(preg_replace('/\s+/', ' ', preg_replace('/[\x00-\x1f\x7f]+/', ' ', $data['_subject'])));
  $s = trim(mb_substr($s, 0, 120));
  if ($s !== '') $subject = '[MMC] ' . $s;
}

$lines = [];
if (isset($data['_sections']) && is_array($data['_sections'])) {
  // Structured layout: Reference on top, then labelled sections of "Label: value" rows (lists already comma-joined by the page).
  $ref = header_safe(clean($data['_ref'] ?? ''));
  $lines[] = 'Reference: ' . ($ref !== '' ? mb_substr($ref, 0, 60) : '-');
  $lines[] = '';
  foreach (array_slice($data['_sections'], 0, 12) as $sec) {
    if (!is_array($sec)) continue;
    $title = header_safe(clean($sec['title'] ?? ''));
    if ($title === '') continue;
    $lines[] = '== ' . mb_strtoupper(mb_substr($title, 0, 60)) . ' ==';
    foreach (array_slice(is_array($sec['rows'] ?? null) ? $sec['rows'] : [], 0, 60) as $row) {
      if (!is_array($row) || count($row) < 2) continue;
      $k = header_safe(clean($row[0]));
      if ($k === '') continue;
      $v = trim(clean($row[1]));
      $lines[] = mb_substr($k, 0, 80) . ': ' . ($v === '' ? '-' : $v);
    }
    $lines[] = '';
  }
} else {
  foreach ($data as $k => $v) {
    if (str_starts_with((string) $k, '_hp')) continue;
    $lines[] = clean($k) . ': ' . (clean($v) === '' ? '-' : clean($v));
  }
}
$body = rtrim(implode("\n", $lines)) . "\n\n--\nSent from the mondaymarketing.company form (" . gmdate('c') . ")";

$headers = [
  'From: Monday Marketing Company <' . FORM_FROM . '>',
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
];
if ($email !== '') $headers[] = 'Reply-To: ' . header_safe(($name !== '' ? $name . ' ' : '') . '<' . $email . '>');

$ok = @mail(FORM_TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers), '-f' . FORM_FROM);
if (!$ok) reply(500, ['ok' => false, 'error' => 'mail']);
reply(200, ['ok' => true]);
