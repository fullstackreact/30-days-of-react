import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

// We'll load our views from the `src/views`
// directory
import Home from './views/Home/Home';
import About from './views/About/About';

const App = props => {
  return (
    <Router>
      <Switch>
        <Route
          path="/about"
          component={About} />
        <Route
          path="*"
          component={Home} />
      </Switch>
    </Router>
  )
}

export default App;