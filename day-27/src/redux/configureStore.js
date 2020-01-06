import { createStore, applyMiddleware } from "redux";

import { rootReducer, initialState } from "./reducers";
import loggingMiddleware from "./loggingMiddleware";
import apiMiddleware from "./apiMiddleware";

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(loggingMiddleware, apiMiddleware)
  );
  return store;
};

export default configureStore;
