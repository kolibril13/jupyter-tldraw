import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";

const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");
  const [, setStroke] = useModelState("stroke");
  const [, setLength] = useModelState("length");

  const handleMount = (editor) => {
    window.editor = editor;
    editor.store.listen(() => {
      if (!editor.isIn("draw.drawing")) return;

      const shapes = editor.getCurrentPageShapesSorted();
      if (shapes.length === 0) return;
      const last = shapes[shapes.length - 1];
      if (last.type !== "draw") return;

      const geo = editor.getShapeGeometry(last.id);
      if (!geo?.vertices?.length) return;

      const transform = editor.getShapePageTransform(last.id);
      const transformed = geo.vertices.map((p) => {
        const tp = transform.applyToPoint(p);
        return [tp.x, tp.y];
      });

      setLength(transformed.length);
      setStroke(transformed);
    });
  };

  return (
    <div style={{ position: "relative", width, height }}>
      <Tldraw
        autoFocus={false}
        onMount={handleMount}
        licenseKey="tldraw-2026-07-31/WyJQUVo1VG1jbCIsWyIqIl0sMTYsIjIwMjYtMDctMzEiXQ.CkPyjP0F73725rI7q6mqJHPO1raBBtGrGMD4brtu2PaIXIywy8PRtij6fcPZHLws627nS5OuHc2OPquvffbhog"
      />
    </div>
  );
});

export default { render };
