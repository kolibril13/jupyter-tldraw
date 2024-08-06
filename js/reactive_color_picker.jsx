import * as React from "react";
import { useState, useRef } from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tldraw, createShapeId, useValue } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";

const render = createRender(() => {
  const [arrowProperties, setArrowProperties] = useModelState("color");
  const [editor, setEditor] = useState(null);
  const previousColorsRef = useRef("");
  const arrowId = createShapeId("arrow");

  const handleMount = (editorInstance) => {
    window.myTldrawEditor = editorInstance;
    setEditor(editorInstance);
    const shapes = [
      { id: createShapeId("rectangle1"), type: "geo", x:  22, y:  23, props: { h:  90, w: 149, color: "black",  dash: "draw", fill: "none",  font: "draw", geo: "rectangle", size: "l",  text: "Color" } },
      { id: createShapeId("rectangle2"), type: "geo", x: 124, y: 197, props: { h:  75, w: 100, color: "violet", dash: "draw", fill: "solid", font: "draw", geo: "rectangle", size: "xl"          } },
      { id: createShapeId("rectangle3"), type: "geo", x: 211, y: 158, props: { h: 136, w: 114, color: "orange", dash: "draw", fill: "solid", font: "draw", geo: "rectangle", size: "xl"          } },
      { id: createShapeId("rectangle4"), type: "geo", x: 265, y: 102, props: { h: 136, w: 114, color: "blue",   dash: "draw", fill: "solid", font: "draw", geo: "rectangle", size: "xl"          } },
      { id: arrowId, type: "arrow", x: 100, y: 170 }
    ];
  
      const bindings = [
        { fromId: arrowId, toId: shapes[0].id, type: "arrow", props: { terminal: "start", normalizedAnchor: { x: 0.5, y: 0.5 } } },
        { fromId: arrowId, toId: shapes[1].id, type: "arrow", props: { terminal: "end",   normalizedAnchor: { x: 0.5, y: 0.5 } } }
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

      const endToColorsString = endToIds ? endToIds.join(",") : "";

      if (endToColorsString !== previousColorsRef.current) {
        const colorToSet = endToColorsString || "grey";
        setArrowProperties(colorToSet);
        previousColorsRef.current = endToColorsString;
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