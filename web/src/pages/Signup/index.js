import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Input, notification } from "antd";
import AuthContext from "contexts/AuthContext";
import AnimatedLogo from "components/AnimatedLogo";
import CircularProgress from "components/CircularProgress";
import Dropzone from './Dropzone';

const Signup = props => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { authenticating, signup, user } = useContext(AuthContext);
  const handleSubmit = () => {
    if (
      image === null ||
      username.length === 0 ||
      name.length === 0 ||
      shortDescription.length === 0 ||
      password.length === 0 ||
      passwordConfirm.length === 0
    ) {
      notification["error"]({ message: "Please fill out all the forms." });
      return;
    }
    if (password === passwordConfirm) {
      signup(username, name, shortDescription, password, image);
    } else {
      notification["error"]({ message: "Passwords do not match." });
    }
  };

  if (authenticating) {
    return <CircularProgress />;
  }

  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <form
      className="login-page"
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Link to="/">
        <AnimatedLogo />
      </Link>

      <Dropzone image={image} setImage={setImage}/>

      <Input
        placeholder="Email"
        autoComplete="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Input
        placeholder="Name"
        autoComplete="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Input
        placeholder="Short Description"
        autoComplete="off"
        value={shortDescription}
        onChange={e => setShortDescription(e.target.value)}
      />
      <Input.Password
        placeholder="Password"
        autoComplete="new-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Input.Password
        placeholder="Confirm Password"
        autoComplete="new-password"
        value={passwordConfirm}
        onChange={e => setPasswordConfirm(e.target.value)}
      />
      <Button type="primary" onClick={handleSubmit}>
        Sign Up
      </Button>
      <Link to="/login">
        <div className="text-white sign-up-text">Login</div>
      </Link>
      <input type="submit" style={{ display: "none" }} />
    </form>
  );
};

Signup.propTypes = {};

Signup.defaultProps = {};

export default Signup;
