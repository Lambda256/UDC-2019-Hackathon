import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "assets/images/logo.svg";
import AuthContext from "contexts/AuthContext";
import AnimatedLogo from "components/AnimatedLogo";
import { Button, Input } from "antd";

const Login = props => {
  const { login } = useContext(AuthContext);
  return (
    <form
      className="login-page"
      onSubmit={e => {
        e.preventDefault();
        login();
      }}
    >
      <Link to="/">
        <AnimatedLogo />
      </Link>

      <Input />
      <Input.Password />
      <Button type="primary">Login</Button>
    </form>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
