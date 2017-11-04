import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

export const load = () => {
  function getCurrentTime(onSuccess, onFail) {
    // Get the current 'global' time from an API using Promise
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(new Date());
      }, 1000);
    });
  }

  getCurrentTime()
    .then(currentTime => getCurrentTime())
    .then(currentTime => {
      ReactDOM.render(
        <div>The current time is: {currentTime.toString()}</div>,
        document.getElementById('demo2')
      );
      return true;
    })
    .catch(err => console.log('There was an error:', err));
};

try {
  load();
} catch (e) {}
