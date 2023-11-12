import importlib.metadata
import pathlib
from pathlib import Path
import base64
import anywidget
from traitlets import Unicode, Int
import io
try:
    __version__ = importlib.metadata.version("tldraw")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"


class TldrawWidget(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)

    _esm = pathlib.Path(__file__).parent / "static" / "widget.js"
    _css = pathlib.Path(__file__).parent / "static" / "widget.css"
    value = Int(0).tag(sync=True)




class TldrawImage(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "static" / "image.js"
    _css = pathlib.Path(__file__).parent / "static" / "image.css"


class TldrawImageArray(anywidget.AnyWidget):




    base64img = Unicode("").tag(sync=True)
    image_width =  Int(300).tag(sync=True)
    image_height = Int(300).tag(sync=True)
    _esm = pathlib.Path(__file__).parent / "static" / "imagearray.js"
    _css = pathlib.Path(__file__).parent / "static" / "imagearray.css"
