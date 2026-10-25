#!/usr/bin/env bash
# Builds the upload package for Hostinger from a finished build, WITHOUT any secret, and refuses to produce a package that has one.
#   bash tools/make-upload-zip.sh [dist-folder] [output-folder]     (defaults: dist, ../deploy-package)
#   bash tools/make-upload-zip.sh --check some-package.zip           (only checks an existing zip)
# Excluded on purpose: forms/config.php (the server keeps its own), .env files, *.sql, *.sqlite, *.log, error_log, mmc-private.
# Fails (exit 1) when the staged files or the finished zip contain config.php, an excluded file type, or a secret-looking value.
set -euo pipefail

# Real secret VALUES only (the public reCAPTCHA site key is meant to be in pages). Same rule as the safety step in .github/workflows/deploy.yml.
SECRET_RE="BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY|RECAPTCHA_SECRET['\"]?[[:space:]]*(=>|=|,|:)[[:space:]]*['\"]6L[0-9A-Za-z_-]{20,}['\"]|ghp_[0-9A-Za-z]{30,}|github_pat_[0-9A-Za-z_]{30,}|EAAB[0-9A-Za-z]{50,}|(APP_KEY|DEPLOY_TOKEN|CRON_KEY|INSTALL_TOKEN|META_CAPI_TOKEN|META_APP_SECRET|DB_PASS)['\"]?[[:space:]]*(=>|=)[[:space:]]*['\"][A-Za-z0-9_+/=-]{24,}['\"]"
BAD_NAME_RE='(^|/)(config\.php|error_log|\.env[^/]*|[^/]*\.(sql|sqlite|log)|mmc-private(/.*)?)$'

scan_dir() {   # $1 = folder
  local bad=0
  if find "$1" -type f | sed "s#^$1/##" | grep -Eq "$BAD_NAME_RE"; then
    echo "REFUSED: forbidden file(s) in the package:" >&2; find "$1" -type f | sed "s#^$1/##" | grep -E "$BAD_NAME_RE" >&2; bad=1
  fi
  if grep -rIlE "$SECRET_RE" "$1" >/tmp/mmc-secret-hits.$$ 2>/dev/null; then
    echo "REFUSED: secret-looking text in:" >&2; sed "s#^$1/##" /tmp/mmc-secret-hits.$$ >&2; bad=1
  fi
  rm -f /tmp/mmc-secret-hits.$$
  return $bad
}

if [ "${1:-}" = "--check" ]; then
  Z="${2:?usage: make-upload-zip.sh --check package.zip}"
  T="$(mktemp -d)"; trap 'rm -rf "$T"' EXIT
  unzip -q "$Z" -d "$T"
  scan_dir "$T" || exit 1
  echo "OK: $Z has no secret files or values."; exit 0
fi

DIST="${1:-dist}"; OUT="${2:-$(cd "$(dirname "$0")/../.." && pwd)/deploy-package}"
[ -f "$DIST/index.html" ] || { echo "REFUSED: $DIST is not a finished build (no index.html). Run npm run build first." >&2; exit 1; }
STAGE="$(mktemp -d)"; trap 'rm -rf "$STAGE"' EXIT
rsync -a --exclude 'forms/config.php' --exclude '.env*' --exclude '*.sql' --exclude '*.sqlite' --exclude '*.log' --exclude 'error_log' --exclude 'mmc-private' --exclude '.DS_Store' "$DIST"/ "$STAGE"/
scan_dir "$STAGE" || exit 1
mkdir -p "$OUT"
ZIP="$OUT/mmc-upload-$(date +%Y%m%d-%H%M).zip"
( cd "$STAGE" && zip -qr "$ZIP" . )
# Check the finished zip itself, not just the staging folder.
if unzip -Z1 "$ZIP" | grep -Eq "$BAD_NAME_RE"; then echo "REFUSED: the zip lists a forbidden file" >&2; rm -f "$ZIP"; exit 1; fi
bash "$0" --check "$ZIP" >/dev/null || { rm -f "$ZIP"; exit 1; }
echo "Package ready: $ZIP"
echo "Reminder: forms/config.php is NOT in it. It stays on the server."
