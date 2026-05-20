import importlib.metadata
import pathlib
import anywidget
from traitlets import Int, Float, List

try:
    __version__ = importlib.metadata.version("tldraw")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"


class TldrawWidget(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)

    _esm = pathlib.Path(__file__).parent / "static" / "minimal.js"
    _css = pathlib.Path(__file__).parent / "static" / "minimal.css"


class MonkeyWidget(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)
    x = Float(0).tag(sync=True)
    y = Float(0).tag(sync=True)

    _esm = pathlib.Path(__file__).parent / "static" / "monkey.js"
    _css = pathlib.Path(__file__).parent / "static" / "monkey.css"


class StrokeWidget(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)
    stroke = List().tag(sync=True)
    length = Int(0).tag(sync=True)

    _esm = pathlib.Path(__file__).parent / "static" / "get_stroke.js"
    _css = pathlib.Path(__file__).parent / "static" / "get_stroke.css"
