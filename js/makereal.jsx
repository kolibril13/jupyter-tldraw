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
import "./widget.css";

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
        backgroundColor: "#007bff", // Bootstrap primary blue
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
        const shapes = editor.store
          .allRecords()
          .filter((r) => r.typeName === "shape");

        const svg = await editor.getSvg(shapes);
        const stringified = svg.outerHTML;
        const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        );

        const blob = await getSvgAsImage(svg, IS_SAFARI, {
          type: "png",
          quality: 1,
          scale: 1.1,
        });

        const base64img = await blobToBase64(blob);

        console.log(base64img);
        console.log(stringified);

        onSave(base64img);
        setShowImage(true); // Show the image after saving
      }}
    >
      Make Real
    </button>
  );
}

export const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");
  const [snapshotData, setSnapshotData] = useModelState("snapshot");
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
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: width,
          height: height,
        }}>
      <Tldraw onMount={handleMount}>
        <SaveButton onSave={setSnapshotData} setShowImage={setShowImage} />
      </Tldraw>
      </div>
      {/* {
      showImage && (
        <>
          <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
            <img src={snapshotData} alt="Base64" />
          </div>

          <div>Make this a plot using matplotlib!</div>
        </>
      )} */}
    </div>
  );
});
