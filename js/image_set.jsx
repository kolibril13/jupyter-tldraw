import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tldraw, useValue, AssetRecordType } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";

const render = createRender(() => {
  const [length, setLength] = useModelState("length");
  const [coord, setCoord] = useModelState("coord");
  const [editor, setEditor] = React.useState(null);
  const [strokePreviouslyActive, setStrokePreviouslyActive] = React.useState(false);
  const [imageDimensions] = useModelState("image_dimensions");
  const [base64img] = useModelState("base64img");

  const handleMount = (editorInstance) => {
    setEditor(editorInstance);
  };

  React.useEffect(() => {
    if (editor && base64img && imageDimensions) {
      const [imageWidth, imageHeight] = imageDimensions;
      const assetId = AssetRecordType.createId();
      const placeholderAsset = { id: assetId, typeName: "asset", type: "image", props: { w: imageWidth, h: imageHeight, name: "card-repo.png", isAnimated: false, mimeType: null, src: base64img }, meta: {} };


      editor.createAssets([placeholderAsset]);

      // Set the position of the image to the top right corner
      const newX = 900 - imageWidth; // Assuming the container width is 900px
      const newY = 0; // Top position

      editor.createShapes([{ type: "image", x: newX, y: newY, props: { w: imageWidth, h: imageHeight, assetId: assetId } }]);
    }
  }, [base64img, editor, imageDimensions]);

  useValue(
    "shapes",
    () => {
      const strokeActive = editor?.isIn("draw.drawing");

      if (strokeActive) {
        setStrokePreviouslyActive(true);
      } else if (strokePreviouslyActive && !strokeActive) {
        // Drawing just finished
        let ob = editor.getCurrentPageShapesSorted();
        if (ob.length === 0) return;
        let lastElement = ob[ob.length - 1];

        if (
          lastElement.props.segments &&
          lastElement.props.segments[0].points
        ) {
          setLength(lastElement.props.segments[0].points.length);

          let points = lastElement.props.segments[0].points;
          let transform = editor.getShapePageTransform(lastElement.id);

          let transformedPoints = points.map((point) => {
            return transform.applyToPoint(point);
          });

          console.log(transformedPoints);
          setCoord(transformedPoints);
        }

        setStrokePreviouslyActive(false); // Reset the flag
      }
    },
    [editor, strokePreviouslyActive]
  );

  return (
    <div style={{ position: "relative", width: "1100px", height: "500px" }}>
      <Tldraw autoFocus={false} onMount={handleMount} showMenu={false} showPages={false} licenseKey="tldraw-2026-07-31/WyJQUVo1VG1jbCIsWyIqIl0sMTYsIjIwMjYtMDctMzEiXQ.CkPyjP0F73725rI7q6mqJHPO1raBBtGrGMD4brtu2PaIXIywy8PRtij6fcPZHLws627nS5OuHc2OPquvffbhog" />
    </div>
  );
});

export default { render };