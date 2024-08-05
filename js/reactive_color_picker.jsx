import * as React from "react";
import { useState } from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tldraw, createShapeId } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";

const render = createRender(() => {
    const [arrowProperties, setArrowProperties] = useState({});
  
    const handleMount = (editor) => {
      window.myTldrawEditor = editor;
  
      const rectangleId1 = createShapeId("rectangle1");
      const rectangleId2 = createShapeId("rectangle2");
      const rectangleId3 = createShapeId("rectangle3");
      const arrowId = createShapeId("arrow");
  
      editor.createShapes([
        { id: rectangleId1, type: "geo", x: 50, y: 50, props: { geo: "rectangle", w: 75, h: 37.5, dash: "draw", color: "blue", size: "m" } },
        { id: rectangleId2, type: "geo", x: 150, y: 150, props: { geo: "rectangle", w: 50, h: 50, dash: "draw", color: "yellow", size: "m" } },
        { id: rectangleId3, type: "geo", x: 210, y: 150, props: { geo: "rectangle", w: 100, h: 75, dash: "draw", color: "red", size: "m" } },
        { id: arrowId, type: "arrow", x: 100, y: 100 }
      ]);
  
      editor.createBindings([
        { fromId: arrowId, toId: rectangleId1, type: "arrow", props: { terminal: "start", normalizedAnchor: { x: 0.5, y: 0.5 }, isExact: false, isPrecise: false } },
        { fromId: arrowId, toId: rectangleId2, type: "arrow", props: { terminal: "end", normalizedAnchor: { x: 0.5, y: 0.5 }, isExact: false, isPrecise: false } }
      ]);
  
      editor.store.listen(() => {
        const arrowBinding = editor.getBindingsInvolvingShape(arrowId);
        const endToIds = arrowBinding
        .filter(item => item.props.terminal === "end")
        .map(item => item.toId);
        if (endToIds) {
          setArrowProperties(endToIds);

        }
      });
    };
  
    return (
      <>
        <div style={{ position: "relative", width: 500, height: 300 }}>
          <Tldraw autoFocus={false} onMount={handleMount} />
        </div>
        <div style={{ position: "relative", top: "0px", fontSize: "20px" }}>
          <pre>{JSON.stringify(arrowProperties, null, 2)}</pre>
        </div>
      </>
    );
  });
  
export default { render };
  

