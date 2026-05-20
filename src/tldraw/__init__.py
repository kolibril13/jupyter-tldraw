import importlib.metadata
import pathlib
import anywidget
from traitlets import Int, Float, List

try:
    __version__ = importlib.metadata.version("tldraw")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"

_STATIC = pathlib.Path(__file__).parent / "static"


class TldrawWidget(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)

    _esm = _STATIC / "basic.js"
    _css = _STATIC / "basic.css"


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
