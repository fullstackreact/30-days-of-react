import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNewTime } from "../../../redux/actionCreators";

const mapStateToProps = state => {
  return {
    currentTime: state.time.currentTime
  };
};

const mapDispatchToProps = dispatch => ({
  updateTime: () => dispatch(fetchNewTime())
});

const Home = props => (
  <div>
    <h1>Welcome home</h1>
    <p>Current time: {props.currentTime}</p>
    <button onClick={props.updateTime}>Update time</button>
    {/* <Link to="/about">Go to about</Link> */}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
