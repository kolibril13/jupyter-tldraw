// widget.js
import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { Tldraw, createShapeId } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

const render = createRender(() => {
  const [flowerData] = useModelState("flower_data");
  const [editor, setEditor] = React.useState(null);
  const [createdShapeIds, setCreatedShapeIds] = React.useState([]);

  const handleMount = (editorInstance) => {
    setEditor(editorInstance);
  };

  React.useEffect(() => {
    if (editor) {
      // Delete previously created shapes
      if (createdShapeIds.length > 0) {
        editor.deleteShapes(createdShapeIds);
      }

      // Check if there is new flower data to render
      if (flowerData && flowerData.length > 0) {
        const gridCols = 15; // Set to 15 columns
        const gridSize = 70; // Reduce gap by reducing the grid size

        const commonProps = {
          dash: "draw",
          fill: "solid",
          font: "draw",
          geo: "ellipse",
          size: "xl",
        };

        const shapes = flowerData.flatMap((flower, index) => {
          const row = Math.floor(index / gridCols);
          const col = index % gridCols;

          const centerX = col * gridSize + 50;
          const centerY = row * gridSize + 50;

          const scale = 5;
          const petalW = flower.petal_width * scale;
          const petalH = flower.petal_length * scale;
          const sepalW = flower.sepal_width * scale;
          const sepalH = flower.sepal_length * scale;
          const r = 1 * scale;

          const anglesPetal = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
          const anglesSepal = anglesPetal.map((a) => a + Math.PI / 3);

          return [
            // Sepals
            ...anglesSepal.map((a, i) => ({
              id: createShapeId(`sepal${index}-${i + 1}`),
              type: "geo",
              x: centerX + Math.sin(a) * (sepalW / 2),
              y: centerY - Math.cos(a) * (sepalW / 2),
              rotation: a,
              props: { h: sepalW, w: sepalH, color: "light-violet", ...commonProps },
            })),
            // Petals
            ...anglesPetal.map((a, i) => ({
              id: createShapeId(`petal${index}-${i + 1}`),
              type: "geo",
              x: centerX + Math.sin(a) * (petalW / 2),
              y: centerY - Math.cos(a) * (petalW / 2),
              rotation: a,
              props: { h: petalW, w: petalH, color: "violet", ...commonProps },
            })),
            // Center Ellipse
            {
              id: createShapeId(`centerEllipse${index}`),
              type: "geo",
              x: centerX - r,
              y: centerY - r,
              props: { h: r * 2, w: r * 2, color: "violet", ...commonProps },
            },
          ];
        });

        // Create new shapes on the canvas
        editor.createShapes(shapes);

        // Keep track of the IDs of the shapes we've just created
        const newShapeIds = shapes.map((shape) => shape.id);
        setCreatedShapeIds(newShapeIds);
      } else {
        // If there's no flower data, clear the shape IDs
        setCreatedShapeIds([]);
      }
    }
  }, [editor, flowerData]);

  return (
    <div style={{ position: "relative", width: "1100px", height: "800px" }}>
      <Tldraw
        autoFocus={false}
        onMount={handleMount}
        showMenu={false}
        showPages={false}
        licenseKey="tldraw-2026-07-31/WyJQUVo1VG1jbCIsWyIqIl0sMTYsIjIwMjYtMDctMzEiXQ.CkPyjP0F73725rI7q6mqJHPO1raBBtGrGMD4brtu2PaIXIywy8PRtij6fcPZHLws627nS5OuHc2OPquvffbhog"
      />
    </div>
  );
});

export default { render };