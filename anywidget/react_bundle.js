import * as React from "https://esm.sh/react@18";
import * as ReactDOM from "https://esm.sh/react-dom@18/client";
function Square() {
  return /* @__PURE__ */ React.createElement("button", { className: "square" }, "X");
}
function render(view) {
  let root = ReactDOM.createRoot(view.el);
  root.render(/* @__PURE__ */ React.createElement(Square, null));
  return () => root.unmount();
}
export {
  render
};
