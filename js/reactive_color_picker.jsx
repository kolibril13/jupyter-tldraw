import * as React from "react";
import { useState } from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tldraw, createShapeId, useValue } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";

const render = createRender(() => {
  const [arrowProperties, setArrowProperties] = useModelState("color");
  const [editor, setEditor] = useState(null);
  const arrowId = createShapeId("arrow");

  const handleMount = (editorInstance) => {
    window.myTldrawEditor = editorInstance;
    setEditor(editorInstance);

    const shapes = [
      { id: createShapeId("rectangle1"), type: "geo", x: 50, y: 50, props: { geo: "rectangle", w: 75, h: 37.5, dash: "draw", color: "blue", size: "m" } },
      { id: createShapeId("rectangle2"), type: "geo", x: 150, y: 150, props: { geo: "rectangle", w: 50, h: 50, dash: "draw", color: "yellow", size: "m" } },
      { id: createShapeId("rectangle3"), type: "geo", x: 210, y: 150, props: { geo: "rectangle", w: 100, h: 75, dash: "draw", color: "red", size: "m" } },
      { id: arrowId, type: "arrow", x: 100, y: 100 },
    ];

    const bindings = [
      { fromId: arrowId, toId: shapes[0].id, type: "arrow", props: { terminal: "start", normalizedAnchor: { x: 0.5, y: 0.5 }, isExact: false, isPrecise: false } },
      { fromId: arrowId, toId: shapes[1].id, type: "arrow", props: { terminal: "end", normalizedAnchor: { x: 0.5, y: 0.5 }, isExact: false, isPrecise: false } },
    ];

    editorInstance.createShapes(shapes);
    editorInstance.createBindings(bindings);
  };

  useValue(
    "binding",
    () => {
      const arrowBinding = editor?.getBindingsInvolvingShape(arrowId);
      const endToIds = arrowBinding
        ?.filter((item) => item.props.terminal === "end")
        .map((item) => {
          const shape = editor.getShape(item.toId);
          return shape ? shape.props.color : null;
        })
        .filter((color) => color !== null);

      if (endToIds) {
        setArrowProperties(endToIds);
      }
    },
    [editor, arrowId]
  );

  return (
    <>
      <div style={{ position: "relative", width: 500, height: 300 }}>
        <Tldraw autoFocus={false} onMount={handleMount} />
      </div>
      {/* <div style={{ position: "relative", top: "0px", fontSize: "20px" }}>
        <pre>{JSON.stringify(arrowProperties, null, 2)}</pre>
      </div> */}
    </>
  );
});

export default { render };