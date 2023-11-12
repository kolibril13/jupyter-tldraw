import * as React from "react";

import { createRender, useModelState } from "@anywidget/react";
import { AssetRecordType, Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

export const render = createRender(() => {
  const [app, setApp] = React.useState(null);

  React.useEffect(() => {
    if (app) {
      const assetId = AssetRecordType.createId();
      const placeholderAsset = {
        id: assetId,
        typeName: "asset",
        type: "image",
        props: {
          w: 200,
          h: 340,
          name: "card-repo.png",
          isAnimated: false,
          mimeType: null,
          src: "./image_assets/im2.png",
        },
        meta: {},
      };

      app.createAssets([placeholderAsset]);

      app.createShapes([
        {
          type: "image",
          props: {
            w: 300,
            h: 240,
            assetId: assetId,
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
