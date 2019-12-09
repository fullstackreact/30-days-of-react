import React from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const Home = () => (
  <div>
    <h1>Welcome home</h1>
    <Link to="/about">Go to about</Link>
  </div>
);
const About = ({ name }) => (
  <div>
    <h1>About {name}</h1>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/about"
            render={renderProps => (
              <div>
                <Link to="/about/ari">Ari</Link>
                <Link to="/about/nate">Nate</Link>
                <Route
                  path="/about/:name"
                  render={renderProps => (
                    <div>
                      <About name={renderProps.match.params.name} />
                      <Link to="/">Go home</Link>
                    </div>
                  )}
                />
              </div>
            )}
          />
          <Route
            path="/"
            render={renderProps => (
              <div>
                Home is underneath me
                <Home {...this.props} {...renderProps} />
              </div>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
