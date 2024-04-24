import * as React from "react";
import { useState } from "react";
import { createRender, useModelState } from "@anywidget/react";

import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";
const render = createRender(() => {
  const [length, setLength] = useState(0);

  return (
    <>
      <div
        style={{
          position: "relative",
          top: "0px",
          fontSize: "40px",
        }}
      >
        Length of currently drawn stroke: {length}
      </div>
      <div
        style={{
          position: "relative",
          width: "500px",
          height: "500px",
        }}
      >
        <Tldraw
          onMount={(editor) => {
            editor.store.listen(() => {
              let ob = editor.getCurrentPageShapesSorted();
              if (ob.length === 0) return;
              let lastElement = ob[ob.length - 1];
              if (
                lastElement.props.segments &&
                lastElement.props.segments[0].points
              ) {
                // Set the length state to the length of the points array
                setLength(lastElement.props.segments[0].points.length);
                console.log(lastElement.props.segments[0].points.length);
              }
            });
          }}
        />
      </div>
    </>
  );
});
export default { render };
