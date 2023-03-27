// index.jsx
import * as React from "https://esm.sh/react@18";
import * as ReactDOM from "https://esm.sh/react-dom@18/client";

function Square() {
  return <button className="square">X</button>;
}

export function render(view) {
  let root = ReactDOM.createRoot(view.el);
  root.render(<Square />);
  return () => root.unmount();
}