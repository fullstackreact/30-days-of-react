import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import 'whatwg-fetch';

import { 
  Router, Route, IndexRoute, 
  IndexRedirect, Link, useRouterHistory 
} from 'react-router';

import {createMemoryHistory} from 'history'

import Demo from './components/Demo';
import IFrameDemo from 'js/app/components/Demo/iframeDemo';
import styles from './17.module.css';
import styleObject from '!css-object!postcss!./17.module.css';

// Router wrapper
const routerWrapper = (Component) => (props) => {
  const history = useRouterHistory(createMemoryHistory)({
          queryKey: false 
        });

  const rootStyles = {
    margin: 0,
    padding: 0,
    fontFamily: 'sans-serif'
  }
  return (
    <div style={styleObject['.day17']}>
      <Component history={history} {...props} />
    </div>
  );
}

// Demo 1
const Home = () => (<div><h1>Welcome home</h1></div>)
const About = () => (<div><h1>About page</h1></div>)

class Demo1Component extends React.Component {
  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={Home} />
        <Route path="/1" component={Home} />
        <Route path="/1/about" component={About} />
      </Router>
    )
  }
}

/*
<Link to="home">Home</Link>
<Link to="about">About</Link>
*/
const Container2 = (props) => {
  return (
    <div 
      style={styleObject['.day17 .app']}
      className="page">
        <h2>Container goes here</h2>
      <div 
        style={styleObject['.day17 .content']}
        className="page">
          {props.children}
      </div>
    </div>
  )
}
class Demo2Component extends React.Component {
  _renderIndexRoute() {
    return (<IndexRedirect to="home" />)
  }
  render() {
    const {withIndex} = this.props;

    return (
      <Router history={this.props.history}>
        <Route path="/" component={Container2}>
          {withIndex && this._renderIndexRoute()}
          <Route path="home" component={Home} />
          <Route path="about" component={About} />
        </Route>
      </Router>
    )
  }
}

const Navbar = () => {
  return (
    <div style={styleObject['.day17 .navbar']}>
      <Link
        style={styleObject['.day17 .navbar .link']}
        to="/home"
        activeStyle={styleObject['.day17 .navbar .link.active']}>
          Home
      </Link>
      <Link
        style={styleObject['.day17 .navbar .link']}
        to="/about"
        activeStyle={styleObject['.day17 .navbar .link.active']}>
          About
      </Link>
    </div>
  )
};

const Container3 = (props) => {
  return (
    <div style={styleObject['.day17 .app']}>
      <Navbar />
      <div style={styleObject['.day17 .content']}>
        {props.children}
      </div>
    </div>
  )
}
class Demo3Component extends React.Component {
  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={Container3}>
          <IndexRedirect to="home" />
          <Route path="home" component={Home} />
          <Route path="about" component={About} />
        </Route>
      </Router>
    )
  }
}

export const load = function(err, cb) {
  let mount;

  mount = document.querySelector('#demo1')
  const Demo1 = routerWrapper(Demo1Component);
  ReactDOM.render(
    <IFrameDemo style={styleObject['body']}>
        <Demo1 />
    </IFrameDemo>, mount);

  const Demo2 = routerWrapper(Demo2Component);
  mount = document.querySelector('#demo2')
  ReactDOM.render(
    <IFrameDemo style={styleObject['body']}>
        <Demo2 />
    </IFrameDemo>, mount);

  const Demo3 = routerWrapper(Demo2Component);
  mount = document.querySelector('#demo3')
  ReactDOM.render(
    <IFrameDemo style={styleObject['body']}>
        <Demo3 withIndex={true} />
    </IFrameDemo>, mount);

  const Demo4 = routerWrapper(Demo3Component);
  mount = document.querySelector('#demo4')
  ReactDOM.render(
    <IFrameDemo style={styleObject['body']}>
        <Demo4 />
    </IFrameDemo>, mount);
}

export default load;