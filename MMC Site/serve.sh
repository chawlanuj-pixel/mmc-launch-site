#!/usr/bin/env bash
# Start the two things build.sh needs: a no-cache dev server on 8080 and a
# Chrome with the debugging port open. Both are idempotent.
#
# The cache headers matter: without no-store the browser happily serves a stale
# .jsx and you end up verifying the previous edit instead of the current one.
set -uo pipefail
cd "$(dirname "$0")"
PROFILE="${TMPDIR:-/tmp}/mmc-chrome-profile"

if curl -sf --max-time 2 http://localhost:8080/ >/dev/null 2>&1; then
  echo "dev server already on :8080"
else
  echo "starting dev server on :8080"
  python3 - <<'PY' >/dev/null 2>&1 &
import http.server, socketserver, functools
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        super().end_headers()
socketserver.TCPServer.allow_reuse_address = True
socketserver.TCPServer(("", 8080), H).serve_forever()
PY
  sleep 1
fi

if curl -sf --max-time 2 http://127.0.0.1:9222/json/version >/dev/null 2>&1; then
  echo "chrome already on :9222"
else
  echo "starting chrome on :9222"
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --remote-debugging-port=9222 --user-data-dir="$PROFILE" \
    --no-first-run --no-default-browser-check \
    --disable-background-timer-throttling --disable-renderer-backgrounding \
    --disable-backgrounding-occluded-windows \
    --disable-features=CalculateNativeWinOcclusion,Translate,MediaRouter \
    "http://localhost:8080/" >/dev/null 2>&1 &
  for _ in $(seq 1 40); do
    curl -sf --max-time 2 http://127.0.0.1:9222/json/version >/dev/null 2>&1 && break
    sleep 0.5
  done
fi
echo "ready: http://localhost:8080/  ·  dashboard at http://localhost:8080/admin/"
