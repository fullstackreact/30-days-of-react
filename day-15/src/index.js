import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import getCurrentTimeHandlerId from "./getCurrentTimeHandlerId";
import getCurrentTimeCallback from "./getCurrentTimeCallback";
import getCurrentTimeOnFail from "./getCurrentTimeOnFail";
import getCurrentTimePromise from "./getCurrentTimePromise";

var currentTimeTimeoutId = getCurrentTimeHandlerId();
console.log("[TimeoutId] The current time is: " + currentTimeTimeoutId);

getCurrentTimeCallback(function(currentTime) {
  console.log("[TimeoutId] The current time is: " + currentTime);
});

getCurrentTimeOnFail(
  function(currentTime) {
    console.log("[Callback] The current time is: " + currentTime);
  },
  function(error) {
    console.log("[Callback] There was an error fetching the time");
  }
);

getCurrentTimeOnFail(
  function(currentTime) {
    getCurrentTimeOnFail(
      function(newCurrentTime) {
        console.log(
          "[Nested Callback] The real current time is: " + currentTime
        );
      },
      function(nestedError) {
        console.log(
          "[Nested Callback] There was an error fetching the second time"
        );
      }
    );
  },
  function(error) {
    console.log("[Nested Callback] There was an error fetching the time");
  }
);

getCurrentTimePromise()
  .then(currentTime => getCurrentTimePromise())
  .then(currentTime => {
    ReactDOM.render(
      <div>The current time is: {currentTime.toString()}</div>,
      document.getElementById("root")
    );
    return true;
  })
  .catch(err => console.log("[Promise] There was an error:", err));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
