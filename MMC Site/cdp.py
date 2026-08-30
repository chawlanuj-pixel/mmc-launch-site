#!/usr/bin/env python3
"""A minimal Chrome DevTools Protocol client, standard library only.

WHY THIS EXISTS
prerender.py needs to drive a real browser: load each page, let React and Babel
run, then read the finished DOM back out. Chrome's own headless CLI flags
(--dump-dom, --screenshot) hang indefinitely in this environment, and pulling in
Playwright or websockets for one build step is a heavy dependency for a project
that otherwise has none.

So this speaks the protocol directly: an HTTP call to find the page target, then
a hand-rolled WebSocket over a plain socket. It is small because it only needs
the handful of frames CDP actually sends: text, close, ping.

It lives in the project rather than a scratch directory because prerender.py is
part of the build (./build.sh step 3) and must keep working on any machine.

USAGE
    import cdp
    from cdp import attach, settle
    ws = attach()                        # first page target on :9222
    ws.call("Page.enable")
    ws.call("Page.navigate", {"url": "http://localhost:8080/"})
    settle(ws, 20)                       # wait for load + network quiet
    cdp.EVENTS                           # every event received so far
"""
import base64
import json
import os
import socket
import struct
import time
import urllib.request

DEVTOOLS = "http://127.0.0.1:9222"

# Every event the socket has seen. prerender.py reads this to collect
# Runtime.exceptionThrown, so a page that renders but throws is still reported.
EVENTS = []


class WS:
    """Just enough WebSocket to talk to Chrome."""

    def __init__(self, url):
        # ws://127.0.0.1:9222/devtools/page/ABC123
        rest = url.split("://", 1)[1]
        hostport, path = rest.split("/", 1)
        host, port = hostport.split(":")
        self.sock = socket.create_connection((host, int(port)), timeout=30)
        self.sock.settimeout(30)
        key = base64.b64encode(os.urandom(16)).decode()
        req = (
            f"GET /{path} HTTP/1.1\r\n"
            f"Host: {hostport}\r\n"
            "Upgrade: websocket\r\n"
            "Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\n"
            "Sec-WebSocket-Version: 13\r\n\r\n"
        )
        self.sock.sendall(req.encode())
        # Read past the handshake response.
        buf = b""
        while b"\r\n\r\n" not in buf:
            chunk = self.sock.recv(4096)
            if not chunk:
                raise EOFError("handshake failed")
            buf += chunk
        self._buf = buf.split(b"\r\n\r\n", 1)[1]
        self._id = 0

    # ---- framing ---------------------------------------------------------

    def _recv(self, n):
        while len(self._buf) < n:
            chunk = self.sock.recv(65536)
            if not chunk:
                raise EOFError("socket closed")
            self._buf += chunk
        out, self._buf = self._buf[:n], self._buf[n:]
        return out

    def send(self, payload):
        data = payload.encode()
        header = bytearray([0x81])           # FIN + text frame
        n = len(data)
        if n < 126:
            header.append(0x80 | n)
        elif n < 65536:
            header.append(0x80 | 126)
            header += struct.pack(">H", n)
        else:
            header.append(0x80 | 127)
            header += struct.pack(">Q", n)
        mask = os.urandom(4)                 # client frames must be masked
        header += mask
        masked = bytes(b ^ mask[i % 4] for i, b in enumerate(data))
        self.sock.sendall(bytes(header) + masked)

    def read(self):
        """Return the next text frame's payload, answering pings on the way."""
        while True:
            b0, b1 = self._recv(2)
            opcode = b0 & 0x0F
            length = b1 & 0x7F
            if length == 126:
                length = struct.unpack(">H", self._recv(2))[0]
            elif length == 127:
                length = struct.unpack(">Q", self._recv(8))[0]
            payload = self._recv(length) if length else b""
            if opcode == 0x8:                # close
                raise EOFError("closed by peer")
            if opcode == 0x9:                # ping -> pong
                self.sock.sendall(bytes([0x8A, 0x80]) + os.urandom(4))
                continue
            if opcode in (0x1, 0x2):
                return payload.decode("utf-8", "replace")
            # continuation / pong: ignore

    # ---- protocol --------------------------------------------------------

    def call(self, method, params=None, timeout=60):
        self._id += 1
        mid = self._id
        self.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
        deadline = time.time() + timeout
        while time.time() < deadline:
            msg = json.loads(self.read())
            if msg.get("id") == mid:
                if "error" in msg:
                    raise RuntimeError(f"{method}: {msg['error']}")
                return msg.get("result", {})
            if "method" in msg:
                EVENTS.append(msg)
        raise TimeoutError(f"{method} timed out")

    def pump(self, seconds):
        """Drain events for a while without issuing a command."""
        end = time.time() + seconds
        self.sock.settimeout(0.4)
        try:
            while time.time() < end:
                try:
                    msg = json.loads(self.read())
                except (socket.timeout, TimeoutError):
                    continue
                if "method" in msg:
                    EVENTS.append(msg)
        finally:
            self.sock.settimeout(30)


def targets():
    with urllib.request.urlopen(DEVTOOLS + "/json", timeout=5) as r:
        return json.load(r)


def attach(match=None):
    """Attach to a page target, preferring one whose URL contains `match`."""
    pages = [t for t in targets() if t.get("type") == "page"
             and t.get("webSocketDebuggerUrl")]
    if not pages:
        # Chrome can be alive with every tab closed. Ask it for a new one
        # rather than making the caller relaunch the whole browser.
        try:
            req = urllib.request.Request(
                DEVTOOLS + "/json/new?about:blank", method="PUT")
            urllib.request.urlopen(req, timeout=5).read()
        except Exception:
            try:
                urllib.request.urlopen(
                    DEVTOOLS + "/json/new?about:blank", timeout=5).read()
            except Exception:
                pass
        time.sleep(1.5)
        pages = [t for t in targets() if t.get("type") == "page"
                 and t.get("webSocketDebuggerUrl")]
    if not pages:
        raise RuntimeError("no page target on " + DEVTOOLS)
    if match:
        for t in pages:
            if match in t.get("url", ""):
                pages = [t] + pages
                break
    ws = WS(pages[0]["webSocketDebuggerUrl"])
    # Caching would serve a previous build's JSX and quietly invalidate a bake.
    try:
        ws.call("Network.enable")
        ws.call("Network.setCacheDisabled", {"cacheDisabled": True})
    except Exception:
        pass
    return ws


def settle(ws, seconds=15):
    """Wait for load, then for the network to go quiet."""
    end = time.time() + seconds
    loaded = False
    ws.sock.settimeout(0.5)
    try:
        while time.time() < end:
            try:
                msg = json.loads(ws.read())
            except (socket.timeout, TimeoutError):
                if loaded:
                    return True
                continue
            if "method" in msg:
                EVENTS.append(msg)
                if msg["method"] in ("Page.loadEventFired",
                                     "Page.frameStoppedLoading"):
                    loaded = True
    finally:
        ws.sock.settimeout(30)
    return loaded
