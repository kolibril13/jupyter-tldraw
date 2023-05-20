import ipyreact
from traitlets import Int
from pathlib import Path
class TldrawWidget(ipyreact.ReactWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)
    _esm = Path(__file__).resolve().parent  / "comp.tsx"
    

