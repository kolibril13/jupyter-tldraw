import * as React from "react";
import { createRender } from "@anywidget/react";
import { AssetRecordType, Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

const render = createRender(() => {
  const [app, setApp] = React.useState(null);

  React.useEffect(() => {
    if (!app) return;

    const assetId = AssetRecordType.createId();
    const placeholderAsset = {
      id: assetId,
      typeName: "asset",
      type: "image",
      props: { 
        w: 400, h: 340, name: "chelsea.png", isAnimated: false, mimeType: "image/png", 
        src: "https://raw.githubusercontent.com/scikit-image/scikit-image/main/skimage/data/chelsea.png" 
      },
      meta: {},
    };

    app.createAssets([placeholderAsset]);
    app.createShapes([{ type: "image", props: { w: 300, h: 240, assetId } }]);
  }, [app]);

  return (
    <div style={{ width: "500px", height: "500px" }}>
      <Tldraw autoFocus={false} onMount={setApp} licenseKey="tldraw-2026-07-31/WyJQUVo1VG1jbCIsWyIqIl0sMTYsIjIwMjYtMDctMzEiXQ.CkPyjP0F73725rI7q6mqJHPO1raBBtGrGMD4brtu2PaIXIywy8PRtij6fcPZHLws627nS5OuHc2OPquvffbhog" />
    </div>
  );
});

export default { render };