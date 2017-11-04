import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import RepeaterKey from './RepeaterKey';

export const load = () => {
  const a = 10;
  const ShowA = () => <div>{a}</div>;
  const MultipleA = () => <div>{a * a}</div>;

  ReactDOM.render(
    <div>
      <ShowA />
      <MultipleA />
    </div>,
    document.getElementById('demo1')
  );

  ReactDOM.render(<RepeaterKey />, document.getElementById('demo2'));
};

try {
  load();
} catch (e) {}
