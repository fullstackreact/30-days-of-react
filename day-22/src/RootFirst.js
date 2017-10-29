import React from 'react';
import { Provider } from 'react-redux';
import App from './AppFirst';

import configureStore from './redux/configureStore'

const Root = (props) => {
  const store = configureStore();
  
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;