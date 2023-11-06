import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import "./widget.css";

export const render = createRender(() => {
	const [value, setValue] = useModelState("value");
	return (
		<button
			className="jupyter_tldraw-counter-button"
			onClick={() => setValue(value + 1)}
		>
			count is {value}
		</button>
	);
});
