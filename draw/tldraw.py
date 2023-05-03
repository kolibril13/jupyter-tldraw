import ipyreact
from traitlets import Unicode,Int
import io
import base64
from pathlib import Path

class TldrawWidget(ipyreact.ReactWidget):
    def __init__(self,my_figure= None, **kwargs):
        if my_figure is None:
            "Plase provide a figure"

        buf = io.BytesIO()
        my_figure.savefig(buf, format='png')

        buf.seek(0)
        base64_img_string_pre = base64.b64encode(buf.getvalue()).decode()
        base64_img_string = f"data:image/png;base64,{base64_img_string_pre}"
        b64_string = base64_img_string_pre

        # decode base64 string to bytes
        decoded_bytes = base64.b64decode(b64_string)

        # check if the file has the PNG signature
        if decoded_bytes[:8] != b'\x89PNG\r\n\x1a\n':
            raise ValueError('Invalid PNG file')

        # extract the IHDR chunk
        ihdr_start = 8
        ihdr_end = decoded_bytes.find(b'IHDR') + 4 + 8
        ihdr_chunk = decoded_bytes[ihdr_start:ihdr_end]

        # extract image width and height from the IHDR chunk
        image_width = int.from_bytes(ihdr_chunk[8:12], byteorder='big')
        image_height = int.from_bytes(ihdr_chunk[12:16], byteorder='big')


        super().__init__(**kwargs, base64img= base64_img_string, image_width = image_width, image_height = image_height)


    image_width = Int(300).tag(sync=True)
    image_height = Int(100).tag(sync=True)

    base64img = Unicode("").tag(sync=True) 
    p  = Path(__file__).resolve().parent  / "tldraw_component.tsx"
    _esm = p.read_text()
    

