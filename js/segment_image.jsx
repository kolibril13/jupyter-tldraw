// not yet working
import { TDAssetType, TDShapeType, Tldraw } from "@tldraw/tldraw";
import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

export const render = createRender(() => {
  const [image_width] = useModelState("image_width");
  const [image_height] = useModelState("image_height");
  const [base64img] = useModelState("base64img");
  const [set_my_coordinates] = useModelState("set_my_coordinates");
  const [app, setApp] = React.useState();

  const handleMount = React.useCallback((app) => {
    setApp(app);
  }, []);

  React.useEffect(() => {
    if (app) {
      app.patchAssets({
        myAssetId: {
          id: "myAssetId",
          type: TDAssetType.Image,
          size: [image_width, image_height],
          fileName: "card-repo.png",
          src: base64img,
        },
      });

      app.createShapes({
        id: "myImage",
        type: TDShapeType.Image,
        assetId: "myAssetId",
        point: [0, 60],
        size: [image_width, image_height],
        isLocked: true,
      });
    }
  }, [base64img, app]);

  const handleChange = (e) => {
    let my_current_stroke = e.selectedIds[0];
    let my_object = e.getShape(my_current_stroke);

    if (my_object === undefined) {
      console.log("no object selected");
    }
    if (my_object !== undefined) {
      let my_points = my_object.points;
      if (my_points !== undefined) {
        console.log(my_object.id);
        console.log(my_points.length);
        console.log(my_points.at(-1));
        // set_my_coordinates(my_object.point.toString());
      }
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: image_width,
        height: image_height + 120,
      }}
    >
      <Tldraw
        onMount={handleMount}
        onChange={handleChange}
        showMenu={false}
        showPages={false}
      />
    </div>
  );
});
