import importlib.metadata
import pathlib
import anywidget
from traitlets import Int, Float, List, Unicode
from traitlets import observe

try:
    __version__ = importlib.metadata.version("tldraw")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"

_STATIC = pathlib.Path(__file__).parent / "static"


class TldrawWidget(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)
    snapshot = Unicode("").tag(sync=True)

    _esm = _STATIC / "basic.js"
    _css = _STATIC / "basic.css"

    def __init__(self, path: pathlib.Path | str | None = None):
        super().__init__()
        self._path = pathlib.Path(path) if path is not None else None
        if self._path is not None and self._path.exists():
            self.snapshot = self._path.read_text()

    @observe("snapshot")
    def _on_snapshot_change(self, change):
        if self._path is not None and change["new"]:
            self._path.write_text(change["new"])


class MonkeyWidget(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)
    x = Float(0).tag(sync=True)
    y = Float(0).tag(sync=True)

    _esm = _STATIC / "monkey.js"
    _css = _STATIC / "monkey.css"


class StrokeWidget(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)
    stroke = List().tag(sync=True)

    _esm = _STATIC / "stroke.js"
    _css = _STATIC / "stroke.css"
