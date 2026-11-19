import base64
import json
import os
import re
import time
import uuid
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PORT = int(os.environ.get("PORT", "8050"))
ROOT_DIR = Path(__file__).resolve().parent
DATA_DIR = Path(os.environ.get("DATA_DIR", str(ROOT_DIR / "data")))
DATA_FILE = DATA_DIR / "store.json"
UPLOAD_DIR = ROOT_DIR / "assets" / "products" / "uploads"
MAX_UPLOAD_BYTES = 5 * 1024 * 1024


class StoreHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT_DIR), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.split("?")[0] == "/api/data":
            if DATA_FILE.exists():
                try:
                    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
                    self._send_json(200, {"ok": True, "data": data})
                except Exception as exc:
                    self._send_json(500, {"ok": False, "error": str(exc)})
            else:
                self._send_json(200, {"ok": True, "data": None})
            return
        super().do_GET()

    def do_POST(self):
        route = self.path.split("?")[0]
        if route == "/api/data":
            try:
                length = int(self.headers.get("Content-Length", "0"))
                raw = self.rfile.read(length)
                payload = json.loads(raw.decode("utf-8"))
                DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
                DATA_FILE.write_text(
                    json.dumps(payload, ensure_ascii=False, indent=2),
                    encoding="utf-8",
                )
                self._send_json(200, {"ok": True})
            except Exception as exc:
                self._send_json(400, {"ok": False, "error": str(exc)})
            return

        if route == "/api/upload":
            try:
                length = int(self.headers.get("Content-Length", "0"))
                if length <= 0 or length > MAX_UPLOAD_BYTES * 2:
                    self._send_json(400, {"ok": False, "error": "Invalid upload size"})
                    return
                raw = self.rfile.read(length)
                payload = json.loads(raw.decode("utf-8"))
                data_url = payload.get("dataUrl", "")
                match = re.match(r"^data:image/(jpeg|jpg|png|webp);base64,(.+)$", data_url, re.DOTALL)
                if not match:
                    self._send_json(400, {"ok": False, "error": "Invalid image format"})
                    return
                ext = "jpg" if match.group(1) in ("jpeg", "jpg") else match.group(1)
                img_bytes = base64.b64decode(match.group(2), validate=True)
                if len(img_bytes) > MAX_UPLOAD_BYTES:
                    self._send_json(400, {"ok": False, "error": "Image too large"})
                    return
                UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
                filename = f"img_{int(time.time() * 1000)}_{uuid.uuid4().hex[:6]}.{ext}"
                target = UPLOAD_DIR / filename
                target.write_bytes(img_bytes)
                rel_path = f"assets/products/uploads/{filename}"
                self._send_json(200, {"ok": True, "path": rel_path})
            except Exception as exc:
                self._send_json(400, {"ok": False, "error": str(exc)})
            return

        self._send_json(404, {"ok": False, "error": "Not found"})


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), StoreHandler)
    print(f"Serving at http://0.0.0.0:{PORT}")
    server.serve_forever()
