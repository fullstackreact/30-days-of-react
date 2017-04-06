import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogout } from './redux/actions/auth';

import Navbar from './components/Nav/Navbar';

import Home from './views/Home';
import Login from './views/Login';
import About from './views/About';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Navbar {...this.props} />
            <Switch>
              <Route
                path='/login'
                render={(props) => (
                  <Login {...props} {...this.props} />
                )} />
              <Route
                path='/about'
                render={(props) => (
                  <About {...props} {...this.props} />
                )} />
              <Route
                path='/'
                render={(props) => (
                  <Home {...props} {...this.props} />
                )} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(tryLogout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
