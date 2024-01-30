import * as React from "react";

import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { createRender, useModelState } from "@anywidget/react";

export const render = createRender(() => {
  const [app, setApp] = React.useState(null);
  const [points] = useModelState("points");

  const [pointsNew] = useModelState("points_new");

  // pointsNew has still to be figured out

  React.useEffect(() => {
    if (app) {

      console.log(pointsNew)
      let my_points = [
        {
          x: 100,
          y: 200,
          z: 0.5,
        },
        {
          x: 100,
          y: 300,
          z: 0.5,
        },
        {
          x: 200,
          y: 300,
          z: 0.5,
        },
        {
          x: 50,
          y: 50,
          z: 0.5,
        },
        {
          x: 500,
          y: 50,
          z: 0.5,
        },
      ];
      app.createShapes([
        {
          type: "draw",
          id: "shape:mypoints",
          rotation: 0,
          typeName: "shape",
          props: {
            color: "green",
            dash: "draw",
            fill: "none",
            isClosed: false,

            segments: [
              {
                type: "free",
                points: my_points,
              },
            ],
          },
        },
      ]);
    }
  }, [app, points, pointsNew]); // This will trigger the effect when `app` changes.

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
