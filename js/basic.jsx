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
      <Tldraw autoFocus={false} licenseKey="tldraw-2026-07-31/WyJQUVo1VG1jbCIsWyIqIl0sMTYsIjIwMjYtMDctMzEiXQ.CkPyjP0F73725rI7q6mqJHPO1raBBtGrGMD4brtu2PaIXIywy8PRtij6fcPZHLws627nS5OuHc2OPquvffbhog" />
    </div>
  );
});

export default { render };
