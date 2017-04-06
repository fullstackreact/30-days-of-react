const loggingMiddleware = (store) => (next) => (action) => {
  // Our middleware
  console.log(`Redux Log:`, action)
  // call the next function
  next(action);
}

export default loggingMiddleware