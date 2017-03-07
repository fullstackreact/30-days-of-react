import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Demo from './components/Demo'

import styles from './11.module.css';

import {Clock} from './components/Timer/clock'
import {
  ChildClock,
  Minute, Second
} from './components/Timer/childClock'

export const load = function(err, cb) {
  let mount;

  mount = document.querySelector('#demo1');
  ReactDOM.render(<Demo>
    <ChildClock separator=':' twelveHours={true} />
    <ChildClock format='h:m p' twelveHours={false} separator=':' />
  </Demo>, mount);

  mount = document.querySelector('#demo2');
  ReactDOM.render(<Demo>
    <div>Minute: <Minute minutes={12} /></div>
    <div>Second: <Second seconds={51} /></div>
  </Demo>, mount);

}

export default load;