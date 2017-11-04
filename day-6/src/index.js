import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.css';
import './index.css';
import Timer from './components/Timer/Timer1';
import Header from './Header1';

export const load = () => {
  ReactDOM.render(<Timer />, document.getElementById('demo1'));

  ReactDOM.render(<Timer />, document.getElementById('demo2'));

  ReactDOM.render(
    <Header title="Timeline" />,
    document.getElementById('demo3')
  );
};

try {
  load();
} catch (e) {}
