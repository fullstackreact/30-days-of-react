import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './App';

export const Root = props => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <div className='root'>
        <App {...props} />
      </div>
    </Provider>
  )
}

export default Root;