import * as React from "react";
import { Tldraw } from "@tldraw/tldraw";

export default function App({ width, height}) {
  return (
    <div
      style={{
        position: "relative",
        width: width,
        height: height,
      }}
    >
      <Tldraw showMenu={false} showPages = {false} />
    </div>
  );
}
