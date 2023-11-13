import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { AssetRecordType, Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

export const render = createRender(() => {
  const [app, setApp] = React.useState(null);
  const [imageWidth] = useModelState("image_width");
  const [imageHeight] = useModelState("image_height");
  const [base64img] = useModelState("base64img");
  const [lastImageX, setLastImageX] = React.useState(0); // State to track the X position of the last image

  const handleMount = React.useCallback((app) => {
    setApp(app);
  }, []);

  React.useEffect(() => {
    if (app && base64img) {
      const assetId = AssetRecordType.createId();
      const placeholderAsset = {
        id: assetId,
        typeName: "asset",
        type: "image",

    
        props: {
          w: imageWidth,
          h: imageHeight,
          name: "card-repo.png",

          isAnimated: false,
          mimeType: null,
          src: base64img,
        },
        meta: {},
      };

      app.createAssets([placeholderAsset]);

      const newX = lastImageX + 0.3*imageWidth;

      app.createShapes([
        {
          type: "image",
          x: newX, 
          y: 0, 
          props: {
            w: imageWidth,
            h: imageHeight,
            assetId: assetId,
          },
        },
      ]);

      setLastImageX(newX); // Update the last image X position
    }
  }, [base64img, app]);

  return (
    <div
      style={{
        position: "relative",
        width: "900px",
        height: "500px",
      }}
    >
      <Tldraw onMount={handleMount} showMenu={false} showPages={false} />
    </div>
  );
});
