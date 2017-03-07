import React, { Children as C } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Demo from './components/Demo'

import {
  createStore, bindActionCreators, combineReducers,
  applyMiddleware
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
  multiActions,
  middleware = []
}) => {
  const reducer = typeof userReducer === 'function' ? 
                    userReducer :
                    combineReducers(userReducer);

  const store = createStore(reducer, applyMiddleware(...middleware));

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

  const loggingMiddleware = store => next => action => {
    console.log(`Redux Log:`, action)
    next(action);
  }
  const apiMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== 'api') {
      return next(action);
    }

    // This is an api request
    const {url} = action.meta;
    const fetchOptions = Object.assign({}, action.meta);
    fetch(url, fetchOptions)
    .then(resp => resp.json())
    .then(json => {
      let newAction = Object.assign({}, action, {payload: json});
      delete newAction.meta;
      store.dispatch(newAction);
    })
  }

  mount = document.querySelector('#demo1')
  DemoWrapper = createDemoWrapper({
    middleware: [loggingMiddleware]
  });
  const Demo1 = connect(state => ({
    currentTime: state.currentTime
  }))(Home);
  ReactDOM.render(<DemoWrapper><Demo1 /></DemoWrapper>, mount);

  const host = 'https://fullstacktime.herokuapp.com'
  const apiReqActions = {
    updateTime: ({timezone = 'pst', str='now'}) => ({
      type: types.FETCH_NEW_TIME,
      meta: {
        type: 'api',
        url: `${host}/${timezone}/${str}.json`,
        method: 'GET'
      }
    })
  }
  const apiReducer = (state = defaultInitialState, action) => {
    switch (action.type) {
      case types.FETCH_NEW_TIME:
        return {...state, currentTime: action.payload.dateString};
      default:
        return state;
    }
  }

  mount = document.querySelector('#demo2')
  DemoWrapper = createDemoWrapper({
    middleware: [apiMiddleware],
    userActions: apiReqActions,
    userReducer: apiReducer
  });
  ReactDOM.render(<DemoWrapper><Demo1 /></DemoWrapper>, mount);
}

export default load;