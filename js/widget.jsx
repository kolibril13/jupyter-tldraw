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
        width: width+20,
        height: height,
      }}
    >
      <Tldraw
        showStyles={false}
        showZoom={false}
        showPages={false}
        showMenu={false}
      />
    </div>
  );
});
