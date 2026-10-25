#!/usr/bin/env bash
# Build the deployable site.
#
# The pages in this repo are authored as JSX and transpiled in the visitor's
# browser, which is fine for a human but invisible to anything that does not run
# JavaScript. This turns the authored source into what actually ships:
#
#   1. apply-seo.py      stages titles/descriptions from content/seo.json
#   2. apply-schema.py   stamps JSON-LD from content/schema.json
#   3. prerender.py      bakes the rendered DOM into each page's #root
#   4. audit-pages.py    writes content/page-audit.json for the CMS Pages tab
#
# RUN THIS BEFORE EVERY DEPLOY, and after any content change. Steps 1 and 2 are
# skipped automatically if their data file is absent, so a fresh clone still
# builds.
#
#   ./build.sh              full build
#   ./build.sh --check      report what would change, write nothing
#
# Requires: the dev server on :8080 and Chrome with --remote-debugging-port=9222.
# Start both with ./serve.sh if they are not already up.
set -uo pipefail
cd "$(dirname "$0")"

CHECK=""
[ "${1:-}" = "--check" ] && CHECK="--check"

step() { printf "\n\033[1m== %s\033[0m\n" "$1"; }
fail=0

if [ -f content/seo.json ]; then
  step "SEO metadata"
  python3 apply-seo.py $CHECK || fail=1
else
  step "SEO metadata"; echo "  skipped: no content/seo.json"
fi

if [ -f content/schema.json ]; then
  step "Structured data"
  python3 apply-schema.py $CHECK || fail=1
else
  step "Structured data"; echo "  skipped: no content/schema.json"
fi

step "Pre-render"
if ! curl -sf --max-time 4 http://127.0.0.1:9222/json/version >/dev/null 2>&1; then
  echo "  Chrome is not listening on 9222. Start it with ./serve.sh, then re-run."
  exit 1
fi
if ! curl -sf --max-time 4 http://localhost:8080/ >/dev/null 2>&1; then
  echo "  No dev server on 8080. Start it with ./serve.sh, then re-run."
  exit 1
fi
python3 prerender.py $CHECK || fail=1

step "Page audit"
python3 audit-pages.py || fail=1

if [ "$fail" -ne 0 ]; then
  printf "\n\033[31mBuild finished with errors. Read the output above before deploying.\033[0m\n"
  exit 1
fi
printf "\n\033[32mBuild complete.\033[0m\n"
