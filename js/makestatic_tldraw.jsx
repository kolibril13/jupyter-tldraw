import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

import { Tldraw, useEditor, createShapeId } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

// TODO Saving should better happen on the python side
function downloadFile(data, filename, type) {
  const file = new Blob([data], { type: type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(a.href);
  }, 0);
}

function LoadButton() {
  const editor = useEditor();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        try {
          const snapshot = JSON.parse(contents);
          editor.store.loadSnapshot(snapshot);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label
        htmlFor="file"
        style={{
          position: "absolute",
          zIndex: 1000,
          right: 10,
          top: 50,
          backgroundColor: "limegreen",
          border: "0px solid black",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Load .json state
      </label>
    </>
  );
}

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
        backgroundColor: "lightgreen",
        border: "0px solid black",
        padding: "5px 10px",
      }}
      onClick={async () => {
        const snapshot = editor.store.getSnapshot();
        const stringified = JSON.stringify(snapshot);
        console.log(stringified);
        downloadFile(stringified, "snapshot.json", "text/plain");
      }}
    >
      Save .json state
    </button>
  );
}

const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");

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
          color: "green",
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
      <Tldraw autoFocus={false} onMount={handleMount}>
        <SaveButton />
        <LoadButton />
      </Tldraw>
    </div>
  );
});


export default { render };
