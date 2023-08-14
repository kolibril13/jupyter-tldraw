import importlib.metadata


try:
    __version__ = importlib.metadata.version("tldraw")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"



from .tldraw import TldrawWidget
from .matplotlib_annotate import TldrawMatplotlib
from .image_segmentation import TldrawSegmentation