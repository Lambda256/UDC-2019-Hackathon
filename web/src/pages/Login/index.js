import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "contexts/AuthContext";
import AnimatedLogo from "components/AnimatedLogo";
import CircularProgress from "components/CircularProgress";
import { Button, Input } from "antd";

const Login = props => {
  const [username, setUsername] = useState("jay@desk.com");
  const [password, setPassword] = useState("12341234");
  const { login, authenticating, user } = useContext(AuthContext);
  if (authenticating) {
    return <CircularProgress />;
  }

  if(user) {
    return <Redirect to="/"/>
  }


  return (
    <form
      className="login-page"
      onSubmit={e => {
        e.preventDefault();
        login(username, password);
      }}
    >
      <Link to="/">
        <AnimatedLogo />
      </Link>

      <Input
        value={username}
        onChange={e => setUsername(e.target.value)}
        autoComplete="username"
      />
      <Input.Password
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="password"
      />
      <Button type="primary" onClick={() => login(username, password)}>
        Login
      </Button>
      <Link to="/signup">
        <div className="text-white sign-up-text">Sign up</div>
      </Link>
      <input type="submit" style={{ display: "none" }} />
    </form>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
