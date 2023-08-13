import * as React from "react";
import { Tldraw } from '@tldraw/tldraw'
import { createRender, useModelState } from "@anywidget/react";

export const render = createRender(() => {
  const [content] = useModelState("content");
  console.log("content", content);
  return (
    <div
      style={{
        position: "relative",
        width: "700px",
        height: "300px",
      }}
    >
      <Tldraw />
    </div>
  );
});