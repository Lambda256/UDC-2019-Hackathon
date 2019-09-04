import React, { Component } from "react";
import api from "utils/api";
import { handleErrorMessage } from "utils/errorMessage";
import {getToken, setToken} from "utils/token";

const AuthContext = React.createContext();
const { Provider, Consumer } = AuthContext;

class AuthProvider extends Component {
  state = {
    user: null,
    email: "abc@mail.com",
    password: "12341234",
    name: "abcde",
    biography: "aa",
    social_link: "a"
  };

  componentWillMount() {
    // this.refreshSession();
  }

  signup = async () => {
    const { email, password, name } = this.state;
    const userForm = { user: { email, password, name } };
    try {
      const user = await api.post("/users.json", userForm);
      const {api_key} = user;
      setToken(api_key);
      this.setState({ user });
    } catch (e) {
      handleErrorMessage(e);
    }
  };

  login = () => {};

  logout = () => {};

  refreshSession = () => {
    const token = getToken();
    console.log("token", token);
  }

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          login: this.login,
          signup: this.signup,
          logout: this.logout,
          updateState: this.updateState
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { AuthProvider, Consumer as AuthConsumer };

export default AuthContext;
