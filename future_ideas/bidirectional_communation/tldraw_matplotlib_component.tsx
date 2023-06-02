import { TDShapeType, Tldraw } from "@tldraw/tldraw";
import * as React from "react";

export default function App({ my_text }) {
const handleMount = React.useCallback((app: Tldraw) => {
    app.createShapes({
    id: "text1",
    type: TDShapeType.Text,
    point: [100, 100],
    text: my_text,
    });
});

return (
    <div
    style={{
        position: "relative",
        width: "500px",
        height: "350px",
    }}
    >
    <Tldraw onMount={handleMount} />
    </div>
);
}