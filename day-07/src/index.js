import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.css';
import './index.css';

import Timeline from './components/Timeline/Timeline';
import Clock from './components/Timer/Clock';
import FetchedTimeline from './FetchedTimeline';

import Container from './Container1';

export const load = () => {
  ReactDOM.render(<Timeline />, document.getElementById('demo1'));

  ReactDOM.render(
    <FetchedTimeline />,
    document.getElementById('fetchedTimeline')
  );

  ReactDOM.render(<Container />, document.getElementById('requestRefresh'));

  ReactDOM.render(<Clock />, document.getElementById('clock'));
};

try {
  load();
} catch (e) {}
