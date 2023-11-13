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
  
      const imagesPerRow = 3;
      const spacing = 0.3; // Adjust spacing as needed
      const rowHeight = imageHeight * (1 + spacing); // Adjust the space between rows as needed
      const newX = (lastImageX + imageWidth * (1 + spacing)) % (imageWidth * imagesPerRow * (1 + spacing));
      const newY = lastImageY + (newX === 0 ? rowHeight : 0);
  
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
  
      setLastImageX(newX);
      setLastImageY(newY); // Update the last image Y position
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






