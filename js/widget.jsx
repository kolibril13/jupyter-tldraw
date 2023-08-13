import * as React from "react";
import { Tldraw } from "@tldraw/tldraw";
import { createRender, useModelState } from "@anywidget/react";

export const render = createRender(() => {
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
      <Tldraw showMenu={false} showPages={false} />
    </div>
  );
});
