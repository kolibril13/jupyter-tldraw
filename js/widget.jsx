import * as React from "react";

import { createRender, useModelState } from "@anywidget/react";


import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";
export const render = createRender(() => {
  return (
    <div
      style={{
        position: "relative",
        width: 400,
        height: 500,
      }}
    >
      <Tldraw />
    </div>
	);
});