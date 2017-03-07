import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import Demo from './components/Demo'
import {
  Panel, Header, Content, Item,
  ContentContainer,
  ActivityItem
} from './components/Timeline/Timeline';

import {
  Clock
} from './components/Timer/clock';

export const load = function(err, cb) {

  let mount = document.querySelector('#demo1');
  ReactDOM.render(<Demo>
    <Clock />
  </Demo>, mount);

  mount = document.querySelector('#demo2');
  ReactDOM.render(<Demo>
    <Clock />
  </Demo>, mount);

  mount = document.querySelector('#demo3');
  ReactDOM.render(<Demo>
    <Panel>
      <Header />
    </Panel>
  </Demo>, mount);
}

export default load;