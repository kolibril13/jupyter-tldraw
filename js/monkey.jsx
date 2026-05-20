import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tldraw, createShapeId, toRichText } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";

const MONKEY_ID = createShapeId("monkey");

const render = createRender(() => {
  const [width] = useModelState("width");
  const [height] = useModelState("height");
  const [, setX] = useModelState("x");
  const [, setY] = useModelState("y");

  const handleMount = React.useCallback((editor) => {
    editor.createShape({
      id: MONKEY_ID,
      type: "text",
      x: 100,
      y: 100,
      props: { richText: toRichText("🐒"), size: "xl", autoSize: true },
    });

    setX(100);
    setY(100);

    return editor.store.listen(({ changes }) => {
      if (MONKEY_ID in (changes.updated ?? {})) {
        const [, after] = changes.updated[MONKEY_ID];
        setX(after.x);
        setY(after.y);
      }
    });
  }, [setX, setY]);

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
