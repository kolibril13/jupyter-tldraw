import * as React from "react";

import { createRender, useModelState } from "@anywidget/react";
import { AssetRecordType, Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

export const render = createRender(() => {
  const [app, setApp] = React.useState(null);
  const [image_width] = useModelState("image_width");
  const [image_height] = useModelState("image_height");
  const [base64img] = useModelState("base64img");

  const handleMount = React.useCallback((app) => {
    setApp(app);
  }, []);

  React.useEffect(() => {
    if (app) {
      const assetId = AssetRecordType.createId();
      const placeholderAsset = {
        id: assetId,
        typeName: "asset",
        type: "image",
        props: {
          w: image_width,
          h: image_height,
          name: "card-repo.png",
          isAnimated: false,
          mimeType: null,
          src: base64img,
        },
        meta: {},
      };

      app.createAssets([placeholderAsset]);

      app.createShapes([
        {
          type: "image",
          props: {
            w: image_width,
            h: image_height,
            assetId: assetId,
          },
        },
      ]);
    }
  }, [base64img, app]); // This will trigger the effect when `app` changes.

  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "500px",
      }}
    >
      <Tldraw onMount={handleMount} showMenu={false} showPages={false} />
    </div>
  );
});
