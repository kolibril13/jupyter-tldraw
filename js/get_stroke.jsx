import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tldraw, useValue } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./widget.css";

const render = createRender(() => {
  const [length, setLength] = useModelState("length");
  const [coord, setCoord] = useModelState("coord");
  const [editor, setEditor] = React.useState(null);
  const [strokePreviouslyActive, setStrokePreviouslyActive] = React.useState(false);

  const handleMount = (editorInstance) => {
    setEditor(editorInstance);
  };

  useValue(
    "shapes",
    () => {
      const strokeActive = editor?.isIn("draw.drawing");

      if (strokeActive) {
        setStrokePreviouslyActive(true);
      } else if (strokePreviouslyActive && !strokeActive) {
        // Drawing just finished
        let ob = editor.getCurrentPageShapesSorted();
        if (ob.length === 0) return;
        let lastElement = ob[ob.length - 1];

        if (
          lastElement.props.segments &&
          lastElement.props.segments[0].points
        ) {
          setLength(lastElement.props.segments[0].points.length);

          let points = lastElement.props.segments[0].points;
          let transform = editor.getShapePageTransform(lastElement.id);

          let transformedPoints = points.map((point) => {
            return transform.applyToPoint(point);
          });

          console.log(transformedPoints);
          setCoord(transformedPoints);
        }

        setStrokePreviouslyActive(false); // Reset the flag
      }
    },
    [editor, strokePreviouslyActive]
  );

  return (
    <>
      {/* <div
        style={{
          position: "relative",
          top: "0px",
          fontSize: "40px",
        }}
      >
        Length of currently drawn stroke: {length}
      </div> */}
      <div
        style={{
          position: "relative",
          width: "500px",
          height: "500px",
        }}
      >
        <Tldraw autoFocus={false} onMount={handleMount} licenseKey="tldraw-2026-07-31/WyJQUVo1VG1jbCIsWyIqIl0sMTYsIjIwMjYtMDctMzEiXQ.CkPyjP0F73725rI7q6mqJHPO1raBBtGrGMD4brtu2PaIXIywy8PRtij6fcPZHLws627nS5OuHc2OPquvffbhog" />
      </div>
    </>
  );
});

export default { render };