import importlib.metadata
import pathlib
from pathlib import Path
import base64
import anywidget
from traitlets import Unicode, Int, observe
import io
from .prompt import sent_request_to_openai

try:
    __version__ = importlib.metadata.version("tldraw")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"


class TldrawWidget(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)

    _esm = pathlib.Path(__file__).parent / "static" / "minimal.js"
    _css = pathlib.Path(__file__).parent / "static" / "minimal.css"
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
    image_width = Int(300).tag(sync=True)
    image_height = Int(300).tag(sync=True)
    _esm = pathlib.Path(__file__).parent / "static" / "image_and_array.js"
    _css = pathlib.Path(__file__).parent / "static" / "image_and_array.css"


class TldrawMakeStaticPNG(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)

    _esm = pathlib.Path(__file__).parent / "static" / "makestatic_png.js"
    _css = pathlib.Path(__file__).parent / "static" / "makestatic_png.css"
    value = Int(0).tag(sync=True)


class TldrawMakeStaticSVG(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)

    _esm = pathlib.Path(__file__).parent / "static" / "makestatic_svg.js"
    _css = pathlib.Path(__file__).parent / "static" / "makestatic_svg.css"
    value = Int(0).tag(sync=True)


class TldrawMakeStaticTldraw(anywidget.AnyWidget):
    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)

    _esm = pathlib.Path(__file__).parent / "static" / "makestatic_tldraw.js"
    _css = pathlib.Path(__file__).parent / "static" / "makestatic_tldraw.css"
    value = Int(0).tag(sync=True)


class MakeReal(anywidget.AnyWidget):
    # this makes sure that the private api key is not shown in the notebook, see https://github.com/jupyter-widgets/ipywidgets/issues/3875
    def _repr_mimebundle_(self, *args, **kwargs):
        mimebundle = super()._repr_mimebundle_(*args, **kwargs)
        mimebundle[0]["text/plain"] = "MakeReal Widget"
        return mimebundle

    api_key = Unicode("KEY").tag(sync=True)
    prompt = Unicode("").tag(sync=True) #empty string by default

    width = Int(600).tag(sync=True)
    height = Int(300).tag(sync=True)
    _esm = pathlib.Path(__file__).parent / "static" / "makereal.js"
    _css = pathlib.Path(__file__).parent / "static" / "makereal.css"
    snapshot = Unicode("").tag(sync=True)

    @observe("snapshot")
    def _observe_count(self, change):
        base64_image = change["new"]
        base64_image = base64_image.replace("data:image/png;base64,", "")
        if self.prompt == "":
            self.prompt = """

            You are an expert data scientist who specializes in creating scientific visualizations with matplotlib from low-fidelity wireframes. 
            Your job is to accept low-fidelity designs and turn them into stunning visualization. When sent new designs, you should reply with your best attempt at a high fidelity working prototype as a single python file.

            If you have to make calculations, you can use numpy.

            The designs may include flow charts, diagrams, labels, arrows, sticky notes, screenshots of other applications, or even previous designs. Treat all of these as references for your prototype. Use your best judgement to determine what is an annotation and what should be included in the final result. Treat anything in the color red as an annotation rather than part of the design. Do NOT include any red elements or any other annotations in your final result.

            Your prototype should look and feel much more complete and advanced than the wireframes provided. Flesh it out, make it real! Try your best to figure out what the data scientist wants and make it happen. If there are any questions or underspecified features, use what you know about applications, user experience, and scientific visualizations to "fill in the blanks". If you're unsure of how the designs should work, take a guess—it's better for you to get it wrong than to leave things incomplete. 

            Remember: you love your data scientist and want them to be happy. The more complete and impressive your prototype, the happier they will be. Good luck, you've got this!
            
            Reply ONLY with python code.
            """
        result = sent_request_to_openai(self.prompt, base64_image, self.api_key)
        print(result)

        from ipylab import JupyterFrontEnd

        app = JupyterFrontEnd()
        app.commands.execute("notebook:insert-cell-below")
        app.commands.execute("notebook:replace-selection", {"text": result})
