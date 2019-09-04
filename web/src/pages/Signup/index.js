import React, { useContext } from "react";
import AuthContext from "contexts/AuthContext";
import PropTypes from "prop-types";
import { Input, Button } from "antd";

function Signup(props) {
  const {
    email,
    password,
    name,
    signup,
    updateState
  } = useContext(AuthContext);

  return (
    <div>
      Signup
      <Input
        value={email}
        placeholder="email"
        onChange={e => updateState("email", e.target.value)}
      />
      <Input.Password
        value={password}
        placeholder="password"
        onChange={e => updateState("password", e.target.value)}
      />
      <Input
        value={name}
        placeholder="name"
        onChange={e => updateState("name", e.target.value)}
      />
      <Button onClick={signup}>Sign up</Button>
    </div>
  );
}

Signup.propTypes = {};

Signup.defaultProps = {};

export default Signup;
