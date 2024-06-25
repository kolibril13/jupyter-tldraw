import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { useState, useEffect } from "react";

import {
  Tldraw,
  useEditor,
  createShapeId,
  exportToBlob,
  FileHelpers,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./makereal.css";

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
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        outline: "none",
      }}
      onClick={async () => {
        // const shapes = editor.selectedShapeIds
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
      Paste to Markdown
    </button>
  );
}

const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");
  const [snapshotData, setSnapshotData] = useModelState("snapshot");
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    let timer;
    if (showImage) {
      timer = setTimeout(() => {
        setShowImage(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [showImage]);

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
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: width,
          height: height,
        }}
      >
        <Tldraw autoFocus={false} onMount={handleMount}>
          <SaveButton onSave={setSnapshotData} setShowImage={setShowImage} />
        </Tldraw>
      </div>
      {/* {showImage && (
        <div style={{ fontSize: "30px" }}>
          OpenAI request takes about 5 seconds. <br />
          {snapshotData}
        </div>
      )}{" "} */}
    </div>
  );
});

export default { render };
