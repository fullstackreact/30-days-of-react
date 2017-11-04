import React from 'react';
import ReactDOM from 'react-dom';

import Frame from 'react-frame-component';

import App from './SimpleRouter';
import TwoRoutes from './TwoRoutes';
import TwoLinkedRoutes from './TwoLinkedRoutes';
import TwoLinkedSingleRoutes from './TwoLinkedSingleRoutes';
import TwoLinkedSingleRenderedRoutes from './TwoLinkedSingleRenderedRoutes';
import './index.css';

export const load = () => {
  ReactDOM.render(<App />, document.getElementById('demo1'));

  ReactDOM.render(
    <Frame>
      <TwoRoutes />
    </Frame>,
    document.getElementById('demo2')
  );

  ReactDOM.render(
    <Frame>
      <TwoLinkedRoutes />
    </Frame>,
    document.getElementById('demo3')
  );

  ReactDOM.render(
    <Frame>
      <TwoLinkedSingleRoutes />
    </Frame>,
    document.getElementById('demo4')
  );

  ReactDOM.render(
    <Frame>
      <TwoLinkedSingleRenderedRoutes />
    </Frame>,
    document.getElementById('demo5')
  );
};

try {
  load();
} catch (e) {
  console.log(e);
}
