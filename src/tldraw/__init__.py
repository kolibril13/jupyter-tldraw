import importlib.metadata


try:
    __version__ = importlib.metadata.version("tldraw")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"



from .tldraw import TldrawWidget
# from .tldraw_matplotlib import TldrawMatplotlib

# import importlib.metadata

