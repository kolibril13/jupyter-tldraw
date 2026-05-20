# Jupyter Tldraw

[![PyPI version](https://img.shields.io/pypi/v/tldraw.svg)](https://pypi.org/project/tldraw/)

A [tldraw](https://tldraw.com) whiteboard as a Jupyter widget, built with [anywidget](https://anywidget.dev).

<img width="946" alt="image" src="https://github.com/kolibril13/jupyter-tldraw/assets/44469195/8ba7e662-1f35-4e3b-b342-6d9fd3079e22">

## Install & run

```sh
uv run --with jupyterlab --with tldraw jupyter lab
```

## Examples

Three example notebooks are included:

| Notebook | Widget | What it shows |
| --- | --- | --- |
| [`basic.ipynb`](basic.ipynb) | `TldrawWidget` | A plain tldraw canvas embedded in a cell. |
| [`monkey.ipynb`](monkey.ipynb) | `MonkeyWidget` | A 🐒 emoji on the canvas; its `x` / `y` are synced as traitlets, so you can `.observe(...)` the position from Python. |
| [`stroke.ipynb`](stroke.ipynb) | `StrokeWidget` | Captures the currently-drawn freehand stroke as a `[[x, y], ...]` list in Python via the `stroke` traitlet. |

Minimal usage:

```python
from tldraw import TldrawWidget
t = TldrawWidget()
t
```

## Developer setup

1. Clone the repo
2. `npm i`
3. `uv sync`
4. `npm run dev` (esbuild watches `js/*.jsx` and rebuilds bundles into `src/tldraw/static/`)
5. `uv run jupyter lab`

### Hot module reload

Put this at the top of any dev notebook, *before* importing the widget:

```python
%env ANYWIDGET_HMR=1
%load_ext autoreload
%autoreload 2
```

`ANYWIDGET_HMR=1` makes anywidget watch the `_esm` / `_css` files; `%autoreload 2` does the same on the Python side. Combined with `npm run dev`, edits to `js/*.jsx` swap into the running widget without re-running the cell.

> anywidget reads `ANYWIDGET_HMR` at import time — if you forgot to set it first, restart the kernel once.
