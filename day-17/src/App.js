import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

const Home = () => (
  <div>
    <h1>Welcome home</h1>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Home} />
      </Router>
    );
  }
}

export default App;
