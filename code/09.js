import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './09.css';

import Demo from './components/Demo'
import {
  Panel, Header, Content, Item,
  ContentContainer,
  ActivityItem
} from './components/Timeline/Timeline';
import {InlineHeader} from './components/Timeline/InlineHeader';

export const load = function(err, cb) {
  let mount;

  mount = document.querySelector('#demo1');
  ReactDOM.render(<Demo>
    <Panel>
      <Header additionalClassesOn={false} />
    </Panel>
  </Demo>, mount);

  mount = document.querySelector('#demo2');
  ReactDOM.render(<Demo>
    <Panel>
      <Header additionalClassesOn={true} />
    </Panel>
  </Demo>, mount);

  mount = document.querySelector('#demo3');
  ReactDOM.render(<Demo>
    <Panel>
      <InlineHeader />
    </Panel>
  </Demo>, mount);

  mount = document.querySelector('#blueTextDemo');
  ReactDOM.render(
    <Demo style={{backgroundColor: '#eee'}}>
      <div style={{color: 'blue'}}>
        This text will have the color blue
      </div>
    </Demo>, mount);
}

export default load;