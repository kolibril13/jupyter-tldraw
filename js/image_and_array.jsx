import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { AssetRecordType, Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

const render = createRender(() => {
  const [app, setApp] = React.useState(null);
  const [imageWidth] = useModelState("image_width");
  const [imageHeight] = useModelState("image_height");
  const [base64img] = useModelState("base64img");
  const [i, seti] = React.useState(1);
  const [lastImageX, setLastImageX] = React.useState(0); // State to track the X position of the last image
  const [lastImageY, setLastImageY] = React.useState(0); // State to track the Y position of the last image

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

      let newX = lastImageX;
      let newY = lastImageY;

      app.createShapes([
        {
          type: "image",
          x: newX,
          y: newY,
          props: {
            w: imageWidth,
            h: imageHeight,
            assetId: assetId,
          },
        },
      ]);

      if (lastImageX != 0 && i % 3 === 0) {
        setLastImageY(lastImageY + 200);
        setLastImageX(0);
      } else {
        setLastImageX(newX + 200);
      }
      seti(i + 1);
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
      <Tldraw autoFocus={false} onMount={handleMount} showMenu={false} showPages={false} />
    </div>
  );
});

export default { render };
