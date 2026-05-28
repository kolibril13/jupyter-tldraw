import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";

const LICENSE_KEY = "tldraw-2026-07-31/WyJQUVo1VG1jbCIsWyIqIl0sMTYsIjIwMjYtMDctMzEiXQ.CkPyjP0F73725rI7q6mqJHPO1raBBtGrGMD4brtu2PaIXIywy8PRtij6fcPZHLws627nS5OuHc2OPquvffbhog";

const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");
  const [snapshot, setSnapshot] = useModelState("snapshot");

  const handleMount = (editor) => {
    if (snapshot) {
      try {
        editor.loadSnapshot(JSON.parse(snapshot));
      } catch (e) {
        console.warn("tldraw: failed to load snapshot", e);
      }
    }

    let saveTimer = null;
    editor.store.listen(() => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        setSnapshot(JSON.stringify(editor.getSnapshot()));
      }, 1000);
    });
  };

  return (
    <div style={{ position: "relative", width, height }}>
      <Tldraw autoFocus={false} onMount={handleMount} licenseKey={LICENSE_KEY} />
    </div>
  );
});

export default { render };
