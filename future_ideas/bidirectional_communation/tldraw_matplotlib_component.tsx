import { TDShapeType, Tldraw } from "@tldraw/tldraw";
import * as React from "react";

export default function App({ my_text, my_text_out }) {

    const [app, setApp] = React.useState()

     const handleMount = React.useCallback((app: Tldraw) => {
         setApp(app)
     }, []);

     React.useEffect(() => {
         if (app) {
         app.createShapes({
             id: "text1",
             type: TDShapeType.Text,
             point: [100, 100],
             text: my_text,
         });
         }
     }, [my_text, app])

    return (
        <div
        style={{
            position: "relative",
            width: "800px",
            height: "350px",
        }}
        >
        <Tldraw onMount={handleMount} onChange={e => console.log("hii")} />
        </div>
    );
}