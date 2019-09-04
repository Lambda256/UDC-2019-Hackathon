import React, { Component } from "react";
import api from "utils/api";
import { handleErrorMessage } from "utils/errorMessage";
import { getToken, setToken, removeToken } from "utils/token";

const AuthContext = React.createContext();
const { Provider, Consumer } = AuthContext;

class AuthProvider extends Component {
  state = {
    user: null,
    authenticating: false,
    wallet: null,
    fetchingWallet: false
  };

  componentWillMount() {
    this.refreshSession();
  }

  signup = async (email, name, shortDescription, password, image) => {
    var formData = new FormData();
    formData.append("user[email]", email);
    formData.append("user[password]", password);
    formData.append("user[name]", name);
    formData.append("user[short_description]", shortDescription);
    formData.append(
      "user[profile_picture]",
      new Blob([image.image], { type: "image/png" })
    );

    try {
      await this.setState({ authenticating: true });
      const user = await api.uploadFormData("POST", "/users.json", formData);
      const { api_key } = user;
      console.log("user", user);
      setToken(api_key);
      this.setState({ user });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ authenticating: false });
    }
  };

  login = async (email, password) => {
    const userForm = { email, password };
    try {
      await this.setState({ authenticating: true });
      const user = await api.get("/users/api_key.json", userForm);
      const { api_key } = user;
      console.log(api_key);
      setToken(api_key);
      this.setState({ user });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ authenticating: false });
    }
  };

  logout = () => {
    removeToken();
    this.setState({ user: null });
  };

  refreshSession = async () => {
    const token = getToken();
    if (token) {
      try {
        await this.setState({ authenticating: true });
        const user = await api.get("/users/me.json", {}, true);
        console.log("user", user);
        this.setState({ user });
      } catch (e) {
        handleErrorMessage(e);
        this.logout();
      } finally {
        await this.setState({ authenticating: false });
      }
    }
  };

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  getWallet = async () => {
    const { fetchingWallet, user } = this.state;
    if (fetchingWallet || !user) return;
    console.log("fetching wallet", fetchingWallet);

    try {
      await this.setState({ fetchingWallet: true });
      const wallet = await api.get("/users/my_wallet.json", {}, true);
      console.log("wallet", wallet);
      this.setState({ wallet });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ fetchingWallet: false });
    }
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          login: this.login,
          signup: this.signup,
          logout: this.logout,
          getWallet: this.getWallet,
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
