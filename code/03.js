import React from 'react';
import ReactDOM from 'react-dom';

export const load = function(err, cb) {
  // Demo 1
  var mountComponent = document.querySelector('#demo1');
  var app = <h1>Hello world</h1>;
  ReactDOM.render(app, mountComponent);

  // Demo 2
  class App extends React.Component {
    render() {
      return <h1>Hello from our app</h1>
    }
  }

  var mountComponent = document.querySelector('#demo2');
  ReactDOM.render(<App />, mountComponent);
}

export default load;