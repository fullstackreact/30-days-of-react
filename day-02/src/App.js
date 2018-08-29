import React, { Component } from 'react';
import HelloWorld from './HelloWorld'
import HelloWorldJSX from './HelloWorldJSX'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HelloWorld />
        <HelloWorldJSX />
      </div>
    );
  }
}

export default App;
