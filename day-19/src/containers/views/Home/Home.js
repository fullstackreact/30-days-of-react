import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    currentTime: state.currentTime
  };
};

const Home = props => (
  <div>
    <h1>Welcome home</h1>
    <p>Current time: {props.currentTime}</p>
    <Link to="/about">Go to about</Link>
  </div>
);

export default connect(mapStateToProps)(Home);
