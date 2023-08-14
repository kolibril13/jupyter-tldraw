import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

export const render = createRender(() => {
  const [label] = useModelState("label");
  let [count, setCount] = useModelState("count");
  function handleClick() {
    console.log("button clicked");
    setCount(count + 1);
  }

  return (
    <div>
      <button onClick={handleClick}>
        {count == 0 && label}
        {count} times clicked
      </button>
    </div>
  );
});
