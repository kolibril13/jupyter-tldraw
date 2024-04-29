import * as React from "react";

import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { createRender, useModelState } from "@anywidget/react";

const render = createRender(() => {
  const [app, setApp] = React.useState(null);
  const [pointsNew] = useModelState("points_new");
  React.useEffect(() => {
    if (app) {
      let pointsNewConverted = pointsNew.map((point) => ({
        x: point[0],
        y: point[1],
        z: 0.5,
      }));

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
                points: pointsNewConverted,
              },
            ],
          },
        },
      ]);
    }
  }, [app, pointsNew]); // This will trigger the effect when `app` changes.

  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "500px",
      }}
    >
      <Tldraw autoFocus={false} onMount={setApp} />
    </div>
  );
});


export default { render };
