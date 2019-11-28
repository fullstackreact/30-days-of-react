import React from "react";
import ReactDOM from "react-dom";
import HelloWorld from "./HelloWorld";
import HelloWorldJSX from "./HelloWorldJSX";

export const load = () => {
  ReactDOM.render(<HelloWorld />, document.getElementById("root"));
  ReactDOM.render(<HelloWorldJSX />, document.getElementById("root-jsx"));
};

try {
  load();
} catch (e) {
  console.log("e ->", e);
}
