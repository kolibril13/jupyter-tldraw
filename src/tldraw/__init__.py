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

    @staticmethod
    def base64_to_image_dimensions(base64_img_string):
        # decode base64 string to bytes
        base64_img_string_only = base64_img_string.split(",")[1]
        decoded_bytes = base64.b64decode(base64_img_string_only)

        # check if the file has the PNG signature
        if decoded_bytes[:8] != b"\x89PNG\r\n\x1a\n":
            raise ValueError("Invalid PNG file")

        # extract the IHDR chunk
        ihdr_start = 8
        ihdr_end = decoded_bytes.find(b"IHDR") + 4 + 8
        ihdr_chunk = decoded_bytes[ihdr_start:ihdr_end]

        # extract image width and height from the IHDR chunk
        image_width = int.from_bytes(ihdr_chunk[8:12], byteorder="big")
        image_height = int.from_bytes(ihdr_chunk[12:16], byteorder="big")

        return image_width, image_height


    def __init__(self, base64img=None, **kwargs):
        if base64img is None:
            "Plase provide a figure"

        image_width, image_height = TldrawImageArray.base64_to_image_dimensions(
            base64img
        )

        super().__init__(
            **kwargs,
            base64img=base64img,
            image_width=int(image_width / 2),
            image_height=int(image_height / 2),
        )


    base64img = Unicode("").tag(sync=True)
    image_width =  Int(300).tag(sync=True)
    image_height = Int(300).tag(sync=True)
    _esm = pathlib.Path(__file__).parent / "static" / "imagearray.js"
    _css = pathlib.Path(__file__).parent / "static" / "imagearray.css"
