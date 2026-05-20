import * as React from "react";

import { createRender, useModelState } from "@anywidget/react";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";
import { Tldraw, createShapeId } from "@tldraw/tldraw";

const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");
  const [recWidth] =  useModelState("rec_width");
  const [recHeight] =  useModelState("rec_height");
  const [recX] =  useModelState("rec_x");
  const [recY] =  useModelState("rec_y");

  const handleMount = (editor) => {
    const id = createShapeId("hello");
    editor.createShapes([
      {
        id,
        type: "geo",
        x: recX,
        y: recY,
        props: {
          geo: "rectangle",
          w: recWidth,
          h: recHeight,
          dash: "draw",
          color: "blue",
          size: "m",
        },
      },
    ]);
  };
  return (
    <div
      style={{
        position: "relative",
        width: width,
        height: height,
      }}
    >
      <Tldraw autoFocus={false} onMount={handleMount} licenseKey="tldraw-2026-07-31/WyJQUVo1VG1jbCIsWyIqIl0sMTYsIjIwMjYtMDctMzEiXQ.CkPyjP0F73725rI7q6mqJHPO1raBBtGrGMD4brtu2PaIXIywy8PRtij6fcPZHLws627nS5OuHc2OPquvffbhog" />
    </div>
  );
});

export default { render };
