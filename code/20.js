import React, { Children as C } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Demo from './components/Demo'

import {
  createStore, bindActionCreators, combineReducers
} from 'redux';
import { Provider, connect } from 'react-redux';

const types = {
  'FETCH_NEW_TIME': 'FETCH_NEW_TIME'
};

const defaultInitialState = {
  currentTime: new Date()
}
const defaultReducer = (state = defaultInitialState, action) => {
  switch(action.type) {
    case types.FETCH_NEW_TIME:
      return {...state, currentTime: new Date()};
    default:
      return state;
  }
}
const defaultActions = {
  updateTime: () => ({type: types.FETCH_NEW_TIME})
}

const createDemoWrapper = ({
  userReducer = defaultReducer,
  userActions = defaultActions,
  multiActions
}) => {
  const reducer = typeof userReducer === 'function' ? 
                    userReducer :
                    combineReducers(userReducer);

  const store = createStore(reducer);

  let actions = {};
  if (multiActions) {
    Object.keys(multiActions).forEach(key => {
      actions[key] = bindActionCreators(multiActions[key], store.dispatch);
    });
  } else {
    actions = bindActionCreators(userActions, store.dispatch);
  }

  return (props) => (
    <Demo>
      <Provider store={store}>
        <div>
          {C.map(props.children, c => {
            const cProps = Object.assign({}, props, {actions});
            return React.cloneElement(c, cProps);
          })}
        </div>
      </Provider>
    </Demo>
  )
}


const Home = ({actions, currentTime}) => {
  return (
    <div>
      <p>Current time: {currentTime.toString()}</p>
      <p><small>From redux</small></p>
      <button onClick={actions.updateTime}>
        Update
      </button>
    </div>
  )
}

export const load = function(err, cb) {
  let mount;
  let DemoWrapper;

  mount = document.querySelector('#demo1')
  const Demo1 = connect(state => ({
    currentTime: state.currentTime
  }))(Home);
  DemoWrapper = createDemoWrapper({})
  ReactDOM.render(<DemoWrapper><Demo1 /></DemoWrapper>, mount);

  DemoWrapper = createDemoWrapper({})
  mount = document.querySelector('#demo2')
  ReactDOM.render(<DemoWrapper><Demo1 /></DemoWrapper>, mount);
}

export default load;