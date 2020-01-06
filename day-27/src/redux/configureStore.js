import { createStore, applyMiddleware } from "redux";

import { rootReducer, initialState } from "./reducers";
import loggingMiddleware from "./loggingMiddleware";
import apiMiddleware from "./apiMiddleware";

let middleware = [apiMiddleware];

if ("development" === process.env.NODE_ENV) {
  middleware.unshift(loggingMiddleware);
}

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
  return store;
};

export default configureStore;
