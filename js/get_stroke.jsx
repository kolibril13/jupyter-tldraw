import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";
const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");

  const handleChange = (e) => {
    console.log("hi");
  };

  return (
    <div
      style={{
        position: "relative",
        width: width,
        height: height,
      }}
    >
      <Tldraw onChange={handleChange} />
    </div>
  );
});
export default { render };
