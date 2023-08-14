import pathlib
from pathlib import Path
import base64
import anywidget
from traitlets import Unicode, Int
import io


class TldrawMatplotlib(anywidget.AnyWidget):
    print("This is experimental")
    image_width = Int(300).tag(sync=True)
    image_height = Int(100).tag(sync=True)
    base64img = Unicode("").tag(sync=True)

    _esm = pathlib.Path(__file__).parent / "static" / "widget.js"
    _css = pathlib.Path(__file__).parent / "static" / "widget.css"

    def update_plot(self, fig):
        self.base64img = TldrawMatplotlib.figure_to_base64(fig)

    @staticmethod
    def figure_to_base64(my_figure):
        buf = io.BytesIO()
        my_figure.savefig(buf, format="png")

        buf.seek(0)
        base64_img_string_only = base64.b64encode(buf.getvalue()).decode()
        base64_img_string = f"data:image/png;base64,{base64_img_string_only}"
        return base64_img_string

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

    def __init__(self, my_figure=None, **kwargs):
        # print("Info: All drawings are deleted when the notebook is reloaded, saving the overlay is not supported yet.")
        if my_figure is None:
            "Plase provide a figure"

        base64_img_string = TldrawMatplotlib.figure_to_base64(my_figure)
        image_width, image_height = TldrawMatplotlib.base64_to_image_dimensions(
            base64_img_string
        )

        super().__init__(
            **kwargs,
            base64img=base64_img_string,
            image_width=image_width,
            image_height=image_height,
        )

    image_width = Int(300).tag(sync=True)
    image_height = Int(100).tag(sync=True)

    base64img = Unicode("").tag(sync=True)
    _esm = pathlib.Path(__file__).parent / "static" /"matplotlib_annotate.js"
    _css = pathlib.Path(__file__).parent / "static" /"matplotlib_annotate.css"
