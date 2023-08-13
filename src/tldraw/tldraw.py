
import pathlib
import anywidget
from traitlets import Int

class TldrawWidget(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)
    _esm = pathlib.Path(__file__).parent / "static" /"widget.js"
    _css = pathlib.Path(__file__).parent / "static" /"widget.css"