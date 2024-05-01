import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { useState } from "react";

import {
  Tldraw,
  useEditor,
  createShapeId,
  getSvgAsImage,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
// import "./widget.css";

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

function SaveButton({ onSave, setShowImage }) {
  const editor = useEditor();

  return (
    <button
      style={{
        position: "absolute",
        zIndex: 1000,
        right: 10,
        top: 10,
        backgroundColor: "#3399FF",
      }}
      onClick={async () => {
        const shapeIds = editor.getCurrentPageShapeIds();

        const svgResult = await editor.getSvgString([...shapeIds], {
          scale: 1,
          background: false,
        });

        const blob = await getSvgAsImage(
          svgResult.svg,
          editor.environment.isSafari,
          {
            type: "png",
            quality: 1,
            scale: 2,
            width: svgResult.width,
            height: svgResult.height,
          }
        );
        // console.log(svgResult);
        // console.log(blob);
        const base64img = await blobToBase64(blob);
        onSave(base64img);
        setShowImage(true); // Show the image after saving
      }}
    >
      Convert to PNG
    </button>
  );
}

const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");
  const [snapshotData, setSnapshotData] = useState("");
  const [showImage, setShowImage] = useState(false);

  const handleMount = (editor) => {
    const id = createShapeId("hello");

    editor.createShapes([
      {
        id,
        type: "geo",
        x: 128,
        y: 128,
        props: {
          geo: "rectangle",
          w: 100,
          h: 100,
          dash: "draw",
          color: "blue",
          size: "m",
        },
      },
    ]);
  };
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: width,
        height: height,
      }}
    >
      {!showImage && (
        <Tldraw autoFocus={false} onMount={handleMount}>
          <SaveButton onSave={setSnapshotData} setShowImage={setShowImage} />
        </Tldraw>
      )}

      {showImage && (
        <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
          <img src={snapshotData} alt="Base64" />
        </div>
      )}
    </div>
  );
});

export default { render };
