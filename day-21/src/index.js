import React from 'react';
import ReactDOM from 'react-dom';
import Frame from 'react-frame-component';

import './index.css';
import Root from './Root';

export const load = () => {
  ReactDOM.render(
    <Frame>
      <Root />
    </Frame>,
    document.getElementById('demo1')
  );
  ReactDOM.render(
    <Frame>
      <Root />
    </Frame>,
    document.getElementById('demo2')
  );
};

try {
  load();
} catch (e) {
  console.log(e);
}
