import * as React from "react";
import { TDAssetType, TDShapeType, Tldraw } from "@tldraw/tldraw";
import { createRender, useModelState } from "@anywidget/react";

export const render = createRender(() => {
  const [image_width] = useModelState("image_width");
  const [image_height] = useModelState("image_height");
  const [base64img] = useModelState("base64img");

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

  return (
    <div
      style={{
        position: "relative",
        width: image_width,
        height: image_height + 120,
      }}
    >
      <Tldraw onMount={handleMount} showMenu={false} showPages={false} />
    </div>
  );
});
