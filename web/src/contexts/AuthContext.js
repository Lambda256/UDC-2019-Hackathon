import React, { Component } from "react";
import { notification } from "antd";
import api from "utils/api";
import { handleErrorMessage } from "utils/errorMessage";
import { getToken, setToken, removeToken } from "utils/token";
import _ from "lodash";

const AuthContext = React.createContext();
const { Provider, Consumer } = AuthContext;

class AuthProvider extends Component {
  state = {
    user: null,
    authenticating: false,
    wallet: null,
    fetchingWallet: false,
    recharging: false,
    redeemHistory: null
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

  recharge = async () => {
    const { wallet, recharging } = this.state;
    if (recharging) return;
    console.log("recharging!");
    try {
      await this.setState({ recharging: true });
      const result = await api.patch("/users/recharge.json", {}, true);
      const walletClone = _.clone(wallet);
      walletClone.hour_balance = result.hour_balance;
      notification["success"]({ message: "1000 HOUR Token replenished." });
      await this.setState({ wallet: walletClone });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ recharging: false });
    }
  };

  redeem = async (private_token_id, amount) => {
    const form = { redeem_request: { private_token_id, amount } };
    console.log("redeeming!");
    try {
      await this.setState({ fetchingWallet: true });
      await api.post("/redeem_requests.json", form, true);
      notification["success"]({ message: "Redeem request successfully sent." });
      window.location = "/wallet";
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ fetchingWallet: false });
    }
  };

  getRedeemHistory = async () => {
    console.log("redeem history!");
    try {
      await this.setState({ fetchingWallet: true });
      const redeemHistory = await api.get(
        "/redeem_requests/history.json",
        {},
        true
      );
      console.log("redeem history", redeemHistory);
      this.setState({ redeemHistory });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ fetchingWallet: false });
    }
  };

  submitSignature = async id => {
    console.log("redeem sig!");
    try {
      await this.setState({ fetchingWallet: true });
      await api.patch(`/redeem_requests/${id}/sign_by_sender.json`, {}, true);
      window.location = "/wallet";
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ fetchingWallet: false });
    }
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
      await this.setState({ wallet });
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
          recharge: this.recharge,
          redeem: this.redeem,
          getRedeemHistory: this.getRedeemHistory,
          submitSignature: this.submitSignature,
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
