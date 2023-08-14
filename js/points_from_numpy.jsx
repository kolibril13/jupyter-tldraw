import * as React from "react";
import { Tldraw } from "@tldraw/tldraw";
import { createRender, useModelState } from "@anywidget/react";

export const render = createRender(() => {
  const [points] = useModelState("points");
  const [app, setApp] = React.useState();

  const handleMount = React.useCallback((app) => {
    setApp(app);
  }, []);

  React.useEffect(() => {
    if (app) {
      app.createShapes({
        type: "draw",
        id: "draw1",
        color: "red",
        points: points,
      });
    }
  }, [points, app]);

  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "450px",
      }}
    >
      <Tldraw onMount={handleMount} onChange={(e) => console.log("hii")} />
    </div>
  );
});
