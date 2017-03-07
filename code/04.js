import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import Demo from './components/Demo'

import 'font-awesome/css/font-awesome.css'
import './30-days.css';
import styles from './30-days-notifications.module.css';

import {Panel, Header, Content} from './components/Timeline/Timeline';

export const load = function(err, cb) {
  // One
  let mount = document.querySelector('#demo1');
  ReactDOM.render(<Demo>
    <Panel>
      <Header />
      <Content />
    </Panel>
  </Demo>, mount);

  // two -- literally the same as the first demo
  mount = document.querySelector('#demo2');
  ReactDOM.render(<Demo>
    <Panel>
      <Header />
      <Content />
    </Panel>
  </Demo>, mount);
}

export default load;