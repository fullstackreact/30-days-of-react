import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { tryLogin } from "../redux/actions/auth";

import Form from "../components/Form/Form";
import Input from "../components/Form/Input";

export const Login = ({ auth, history, tryLogin }) => {
  if (auth.isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <h1>Login</h1>
      <Form onSubmit={tryLogin}>
        <Input
          name={"username"}
          type="text"
          placeholder={"Enter your username"}
        />
        <Input
          name={"password"}
          type="password"
          placeholder={"Enter your username"}
        />
      </Form>
      <p>
        <Link to="/">Back</Link>
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  tryLogin: creds => dispatch(tryLogin(creds))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
