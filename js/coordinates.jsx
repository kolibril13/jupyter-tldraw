import * as React from "react";

import { createRender } from "@anywidget/react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

export const render = createRender(() => {
  const [app, setApp] = React.useState(null);

  React.useEffect(() => {
    if (app) {
      app.createShapes([
        {
          type: "draw",
          rotation: 0,
          typeName: "shape",
          props: {
            color: "green",
            dash: "draw",
            fill: "none",
            isClosed: false,
            segments: [
              {
                type: "straight",
                points: [
                  { x: 100, y: 100, z: 0.5 },
                  { x: 200, y: 200, z: 0.5 },
                ],
              },
              {
                type: "straight",
                points: [
                  { x: 200, y: 400, z: 0.5 },
                  { x: 400, y: 200, z: 0.5 },
                ],
              },
              {
                type: "straight",
                points: [
                  { x: 400, y: 200, z: 0.5 },
                  { x: 500, y: 100, z: 0.5 },
                ],
              },
            ],
          },
        },
      ]);
    }
  }, [app]); // This will trigger the effect when `app` changes.

  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "500px",
      }}
    >
      <Tldraw onMount={setApp} />
    </div>
  );
});
