import marimo

__generated_with = "0.23.6"
app = marimo.App()


@app.cell
def _():
    import marimo as mo
    from tldraw import MonkeyWidget

    return MonkeyWidget, mo


@app.cell
def _(MonkeyWidget, mo):
    m = mo.ui.anywidget(MonkeyWidget(width=900, height=440))


    p1 = "/Users/jan-hendrik/projects/jupyter-tldraw/js/monkey.jsx"
    p2 = "/Users/jan-hendrik/projects/jupyter-tldraw/src/tldraw/static/monkey.js"
    mo.watch.file(p1)
    mo.watch.file(p2) 

    m
    return (m,)


@app.cell
def _(m):
    m.x, m.y
    return


@app.cell
def _():
    return


@app.cell
def _():
    return


if __name__ == "__main__":
    app.run()
