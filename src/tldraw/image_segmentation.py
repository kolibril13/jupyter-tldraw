# TODO: This code needs some cleanup, but it works :)

import base64
import io

import pathlib


import matplotlib.pyplot as plt
import numpy as np
import anywidget
from skimage import data
from skimage.color import label2rgb
from skimage.filters import sobel
from skimage.measure import label
from skimage.segmentation import watershed
from traitlets import Unicode, Int, observe


class TldrawSegmentation(anywidget.AnyWidget):
    print("This is experimental")

    def __init__(self, coins, edges, markers, **kwargs):
        super().__init__(**kwargs)
        self.coins = coins
        self.edges = edges
        self.markers = markers

    @staticmethod
    def generate_image_assets():
        coins = data.coins()
        edges = sobel(coins)
        markers = np.zeros(coins.shape, dtype=np.uint)

        fig, ax = plt.subplots()
        ax.axis("off")
        ax.imshow(coins, cmap="gray")
        plt.tight_layout()
        buf = io.BytesIO()
        fig.savefig(
            buf, format="png", bbox_inches="tight", transparent="True", pad_inches=0
        )
        plt.close()
        buf.seek(0)

        base64_img_string_pre = base64.b64encode(buf.getvalue()).decode()
        base64_img_string = f"data:image/png;base64,{base64_img_string_pre}"
        b64_string = base64_img_string_pre
        decoded_bytes = base64.b64decode(b64_string)

        ihdr_start = 8
        ihdr_end = decoded_bytes.find(b"IHDR") + 4 + 8
        ihdr_chunk = decoded_bytes[ihdr_start:ihdr_end]
        image_width = int.from_bytes(ihdr_chunk[8:12], byteorder="big")
        image_height = int.from_bytes(ihdr_chunk[12:16], byteorder="big")

        return base64_img_string, image_width, image_height, coins, edges, markers

    @staticmethod
    def segment_image_based_on_marker(marker_coord, coins, edges, markers):
        coord = marker_coord.split(",")
        coord = [int(float(i)) for i in coord]
        coord[1] = coord[1] - 60  # because tldraw canvas is image_height+120
        coord = [coord[1], coord[0]]  # because of different coordinate system
        # because of image scaling in canvas, could be improved
        coord[0] = int(coord[0] / 1.43)
        coord[1] = int(coord[1] / 1.43)

        foreground, background = 1, 2
        markers[coins < 30.0] = background
        markers[coord[0], coord[1]] = foreground

        # based on https://scikit-image.org/docs/stable/auto_examples/segmentation/plot_expand_labels.html#sphx-glr-auto-examples-segmentation-plot-expand-labels-py
        ws = watershed(edges, markers)
        seg1 = label(ws == foreground)

        fig, ax = plt.subplots()
        color1 = label2rgb(seg1, image=coins, bg_label=0)
        ax.axis("off")
        ax.imshow(color1)

        buf = io.BytesIO()
        fig.savefig(
            buf, format="png", bbox_inches="tight", transparent="True", pad_inches=0
        )
        plt.close()
        buf.seek(0)
        base64_img_string_pre = base64.b64encode(buf.getvalue()).decode()
        base64_img_string = f"data:image/png;base64,{base64_img_string_pre}"

        return base64_img_string

    my_coordinates = Unicode("Hello World").tag(sync=True)
    base64img = Unicode("").tag(sync=True)
    image_width = Int(300).tag(sync=True)
    image_height = Int(100).tag(sync=True)

    @observe("my_coordinates")
    def _observe_my_coordinates(self, change):
        self.base64img = TldrawSegmentation.segment_image_based_on_marker(
            self.my_coordinates, self.coins, self.edges, self.markers
        )

    _esm = pathlib.Path(__file__).parent / "static" / "segment_image.js"
    _css = pathlib.Path(__file__).parent / "static" / "segment_image.css"
    # _esm = Path.cwd() / "src" / "tldraw" / "static" / "segment_image.js"
    # _css = Path.cwd() / "src" / "tldraw" / "static" / "segment_image.css"
