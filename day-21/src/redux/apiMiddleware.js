const apiMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== "api") {
    return next(action);
  }
  // This is an api request

  // Find the request URL and compose request options from meta
  const { url } = action.meta;
  const fetchOptions = Object.assign({}, action.meta);

  // Make the request
  fetch(url, fetchOptions)
    // convert the response to json
    .then(resp => resp.json())
    .then(json => {
      if (typeof action.meta.onSuccess === "function") {
        action.meta.onSuccess(json);
      }
      return json; // For the next promise in the chain
    })
    .then(json => {
      // respond back to the user
      // by dispatching the original action without
      // the meta object
      let newAction = Object.assign({}, action, {
        payload: json.dateString
      });
      delete newAction.meta;
      store.dispatch(newAction);
    });
};

export default apiMiddleware;
