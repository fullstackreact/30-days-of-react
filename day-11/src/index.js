import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Minute from './components/Timer/Minute';
import Second from './components/Timer/Second';
import Clock from './components/Timer/Clock';

export const load = () => {
  ReactDOM.render(
    <div>
      <div>
        Minute: <Minute minutes={12} />
      </div>
      <div>
        Second: <Second seconds={51} />
      </div>
    </div>,
    document.getElementById('demo1')
  );

  ReactDOM.render(
    <div className="clock">
      <Clock format="h:m:s p" />
    </div>,
    document.getElementById('demo2')
  );
};

try {
  load();
} catch (e) {
  console.log(e);
}
