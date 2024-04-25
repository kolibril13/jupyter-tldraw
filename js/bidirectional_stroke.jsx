import * as React from "react";
import { useState } from "react";
import { createRender, useModelState } from "@anywidget/react";

import { AssetRecordType, Tldraw, createShapeId } from "tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";
const render = createRender(() => {
  const [length, setLength] = useModelState("length");
  const [coord, setCoord] = useModelState("coord");
  const [base64img] = useModelState("base64img");

  const handleMount = (editor) => {
    const assetId = AssetRecordType.createId();
    const placeholderAsset = {
      id: assetId,
      typeName: "asset",
      type: "image",
      props: {
        w: 400,
        h: 340,
        name: "card-repo.png",
        isAnimated: false,
        mimeType: null,
        src: base64img,
      },
      meta: {},
    };

    editor.createAssets([placeholderAsset]);

    editor.createShapes([
      {
        type: "image",
        props: {
          w: 300,
          h: 240,
          assetId: assetId,
        },
      },
    ]);

    editor.store.listen(() => {
      if (editor.isIn("draw.drawing")) {
        console.log("Drawing");

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

          // Create a new array to store transformed points
          let transformedPoints = [];

          // Apply the transformation to each point and add it to the transformedPoints array
          points.forEach((point) => {
            let pageSpacePoint = transform.applyToPoint(point);
            transformedPoints.push(pageSpacePoint);
          });

          console.log(transformedPoints);
          setCoord(transformedPoints);
        }
      }
    });
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          top: "0px",
          fontSize: "40px",
        }}
      >
        Length of currently drawn stroke: {length}
      </div>
      <div
        style={{
          position: "relative",
          width: "500px",
          height: "500px",
        }}
      >
        <Tldraw onMount={handleMount}></Tldraw>
      </div>
    </>
  );
});
export default { render };
