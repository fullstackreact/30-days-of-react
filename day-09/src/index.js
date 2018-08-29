import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.css';
import './index.css';

import Header from './components/Timeline/Header';

export const load = () => {
  ReactDOM.render(
    <Header title="Orange header" />,
    document.getElementById('demo1')
  );

  const style = {color: 'blue'};
  ReactDOM.render(
    <div style={style}>This text will have the color blue</div>,
    document.getElementById('blueTextDemo')
  );

  ReactDOM.render(
    <Header title="Orange header" />,
    document.getElementById('demo2')
  );

  ReactDOM.render(
    <Header title="Orange header" />,
    document.getElementById('demo3')
  );
};

try {
  load();
} catch (e) {}
