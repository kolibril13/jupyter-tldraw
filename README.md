# Jupyter Tldraw
[![PyPI version](https://img.shields.io/pypi/v/tldraw.svg)](https://pypi.org/project/tldraw/)
<img width="946" alt="image" src="https://github.com/kolibril13/jupyter-tldraw/assets/44469195/8ba7e662-1f35-4e3b-b342-6d9fd3079e22">


Installation:
```
python3.11 -m venv .venv
pip install jupyterlab
pip install tldraw
jupyterlab   (or alternative VS Code Jupyter Lab)
```

Example:
```
from tldraw import TldrawWidget
t = TldrawWidget()
t
```

# Changelog

## 2.0.3

Update to version `2.0.0-alpha.19`


## 2.0.2

Add experimental TldrawImageArray

## 2.0.1

Switch to new version: `@tldraw/tldraw@2.0.0-canary.b9d82466295e` (Version from 6th November2023)

<!-- npm install @tldraw/tldraw@2.0.0-canary.b9d82466295e -->

## 2.0.0

* simplify to minimal template


## 1.0.0

* Rename notebooks, and prepare 2.0.0 release.

## 0.1.5

* add .venv to gitignore, so that it's not uploaded to pypi by hatch build.

## 0.1.4

* Add experimental TldrawSegmentation


## 0.1.3
* format toml

## 0.1.2

* replace ipyreact backend with anywidget backend.
  * this will make this package more reliable, because all js and css is shipped via pip and not anymore via cdn.
* Remove JupyterLite build.
* Remove experimental files.


## 0.1.1

* add update_plot in TldrawMatplotlib

## 0.1.0

* Added TldrawMatplotlib

## 0.0.3

* refactor readme
* add jupyterlite demo
## 0.0.2

* refactor code

## 0.0.1

* init setup
