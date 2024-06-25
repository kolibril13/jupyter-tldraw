import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { useState } from "react";

import {
  Tldraw,
  useEditor,
  createShapeId,
  exportToBlob,
  FileHelpers,
} from "@tldraw/tldraw";

import "@tldraw/tldraw/tldraw.css";
// import "./widget.css";



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
        const blob = await exportToBlob({
          editor,
          ids: [...shapeIds],
          format: "png",
          opts: { background: false },
        });
        const base64img = await FileHelpers.blobToDataUrl(blob);
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
