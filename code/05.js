import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import Demo from './components/Demo'
import {
  Panel, Header, Content, Item,
  ContentContainer,
  ActivityItem
} from './components/Timeline/Timeline';

export const load = function(err, cb) {
  // One
  let mount = document.querySelector('#demo1');
  ReactDOM.render(<Demo>
    <Panel>
      <Header />
      <Content />
    </Panel>
  </Demo>, mount);

  mount = document.querySelector('#demo2');
  ReactDOM.render(
    <Demo>
      <Panel>
        <Header title="Timeline" />
        <Header title="Profile" />
        <Header title="Settings" />
        <Header title="Chat" />
      </Panel>
    </Demo>, mount);

  const moment1 = {
    timestamp: new Date().getTime(),
    text: "Ate lunch",
    user: {
      id: 1,
      name: 'Nate',
      avatar: "http://www.croop.cl/UI/twitter/images/doug.jpg"
    },
    comments: [
      { from: 'Ari', text: 'Me too!' }
    ]
  };

  mount = document.querySelector('#demo3');
  ReactDOM.render(
    <Demo>
      <Panel>
        <ContentContainer>
          <ActivityItem activity={moment1} />
        </ContentContainer>
      </Panel>
    </Demo>, mount);
}

export default load;