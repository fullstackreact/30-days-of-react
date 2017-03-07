import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import 'whatwg-fetch';
import Demo from './components/Demo';
import {
  TimeComponent
} from './components/Timer/timeComponent'

export const load = function(err, cb) {
  let mount;

  mount = document.querySelector('#demo1');
  ReactDOM.render(<Demo>
    <TimeComponent />
  </Demo>, mount);
}

export default load;