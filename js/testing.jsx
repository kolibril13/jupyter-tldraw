import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

export const render = createRender(() => {
  const [label] = useModelState("label");

  function handleClick() {
    console.log("button clicked");
    // on_my_python_function()
  }

  return (
    <div>
      <button onClick={handleClick}>{label}</button>
    </div>
  );
});

