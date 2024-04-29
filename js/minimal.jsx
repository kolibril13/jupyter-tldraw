import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";

const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");
  return (
    <div
      style={{
        position: "relative",
        width: width,
        height: height,
      }}
    >
      <Tldraw autoFocus={false} />
    </div>
  );
});

export default { render };
