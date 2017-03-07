import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Demo from './components/Demo'

import {
  createStore, bindActionCreators
} from 'redux';
import { Provider, connect } from 'react-redux';

const types = {
  'FETCH_NEW_TIME': 'FETCH_NEW_TIME'
};

export const initialState = {
  currentTime: new Date()
}
export const reducer = function(state = initialState, action) {
  return state;
}
const preActions = {
  updateTime: () => ({type: types.FETCH_NEW_TIME})
}

const store = createStore(reducer);
const actions = {
  currentTime: bindActionCreators(preActions, store.dispatch)
}

const DemoWrapper = (props) => {
  return (
    <Demo>
      <Provider store={store}>
        {props.children}
      </Provider>
    </Demo>
  )
}

const Home = ({currentTime}) => {
  return (
    <div>
      <p>Current time: {currentTime.toString()}</p>
      <p><small>From redux</small></p>
    </div>
  )
}

export const load = function(err, cb) {
  let mount;

  mount = document.querySelector('#demo1')
  const Demo1 = connect(state => ({
    currentTime: state.currentTime
  }))(Home);
  ReactDOM.render(<DemoWrapper><Demo1 /></DemoWrapper>, mount);
}

export default load;