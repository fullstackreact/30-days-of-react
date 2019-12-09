import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

const Home = () => (
  <div>
    <h1>Welcome home</h1>
  </div>
);
const About = () => (
  <div>
    <h1>About</h1>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
