import marimo

__generated_with = "0.7.17"
app = marimo.App(width="medium")


@app.cell
def __():
    import matplotlib.pyplot as plt
    import numpy as np
    plt.style.use('_mpl-gallery')

    # make the data
    np.random.seed(3)
    x = 4 + np.random.normal(0, 2, 24)
    y = 4 + np.random.normal(0, 2, len(x))
    # size and color:
    sizes = np.random.uniform(15, 80, len(x))
    opacity = np.random.uniform(0, 1, len(x))
    return np, opacity, plt, sizes, x, y


@app.cell
def __():
    from tldraw import ReactiveColorPicker
    import marimo as mo
    widget = mo.ui.anywidget(ReactiveColorPicker())
    widget
    return ReactiveColorPicker, mo, widget


@app.cell
def __(widget):
    c = widget.color
    type(c)
    return c,


@app.cell
def __(c, np, opacity, plt, sizes, x, y):
    fig, ax = plt.subplots()

    ax.set(xlim=(0, 8), xticks=np.arange(1, 8), ylim=(0, 8), yticks=np.arange(1, 8))

    ax.scatter(x, y, s=sizes, color=c, alpha=opacity)

    plt.show()
    return ax, fig


@app.cell
def __():
    return


if __name__ == "__main__":
    app.run()
