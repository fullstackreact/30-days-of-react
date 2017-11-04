import React from 'react';
import ReactDOM from 'react-dom';
import App from './BlankApp';
import Complete from './App';
import './index.css';

export const load = () => {
  ReactDOM.render(<App />, document.getElementById('demo1'));

  ReactDOM.render(<App />, document.getElementById('demo2'));

  ReactDOM.render(<Complete />, document.getElementById('demo3'));
};

try {
  load();
} catch (e) {}
