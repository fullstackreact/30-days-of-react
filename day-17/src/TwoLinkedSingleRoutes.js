import React from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const Home = () => (
  <div>
    <h1>Welcome home</h1>
    <Link to="/about">Go to about</Link>
  </div>
);
const About = () => (
  <div>
    <h1>About</h1>
    <Link to="/">Go home</Link>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
