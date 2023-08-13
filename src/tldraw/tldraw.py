
import pathlib
import anywidget
import traitlets

class TldrawWidget(anywidget.AnyWidget):
    content = traitlets.Unicode("Hi").tag(sync=True)
    _esm = pathlib.Path(__file__).parent / "static" /"widget.js"
