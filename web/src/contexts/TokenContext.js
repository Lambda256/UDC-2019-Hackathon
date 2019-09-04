import React, { Component } from "react";
import api from "utils/api";
import { notification } from "antd";
import { handleErrorMessage } from "utils/errorMessage";
import _ from "lodash";

const TokenContext = React.createContext();
const { Provider, Consumer } = TokenContext;

class TokenProvider extends Component {
  state = {
    orders: [],
    fetchingOrders: false,
    holders: [],
    buying: false,
    selling: false,
    graphData: [],
    fetchingHistory: false
  };

  createToken = async () => {
    const {
      symbol,
      initial_price,
      charity,
      biography,
      social_links
    } = this.state;
    const tokenForm = {
      symbol,
      initial_price,
      charity,
      biography,
      social_links
    };
    try {
      const tokens = await api.post("/private_tokens.json", tokenForm, true);
      this.setState({ tokens });
    } catch (e) {
      handleErrorMessage(e);
    }
  };

  buyToken = async (id, symbol) => {
    const { buyingToken } = this.state;
    if (buyingToken) return;

    try {
      await this.setState({ buyingToken: true });
      const privateTokens = await api.post(
        `/private_tokens/${id}/buy.json`,
        {},
        true
      );
      notification["success"]({
        message: `1 ${symbol} successfully purchased!`
      });
      await this.setState({ privateTokens });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ buyingToken: false });
    }
  };

  getOrders = async private_token_id => {
    console.log("getting orders");
    try {
      await this.setState({ fetchingOrders: true });
      const orders = await api.get("/orders.json", { private_token_id }, true);
      console.log("orders", orders);
      this.setState({ orders: _.reverse(orders) });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ fetchingOrders: false });
    }
  };

  getHolders = async symbol => {
    try {
      const holders = await api.get(
        `/private_tokens/${symbol}/holders.json`,
        {}
      );
      this.setState({ holders });
    } catch (e) {
      handleErrorMessage(e);
    }
  };

  takeToken = async (private_token_id, take_id) => {
    const { orders, buying } = this.state;
    if (buying) return;
    try {
      await this.setState({ buying: true });
      await api.patch(`/orders/${take_id}/take.json`, {}, true);
      notification["success"]({ message: "Buy order successfully taken." });
      const ordersClone = _.clone(orders);
      ordersClone.pop();
      this.setState({ orders: ordersClone });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ buying: false });
    }
  };

  sellToken = async (private_token_id, price, amount) => {
    const { orders, selling } = this.state;
    if (selling) return;
    try {
      const form = { order: { private_token_id, price, amount } };
      await this.setState({ selling: true });
      const result = await api.post(`/orders`, form, true);
      notification["success"]({ message: "Sell order successfully posted." });
      const ordersClone = _.clone(orders);
      ordersClone.push(result);
      _.sortBy(ordersClone, ["price"]);
      this.setState({ orders: ordersClone });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ selling: false });
    }
  };

  getHistory = async (id, category, limit) => {
    const { fetchingHistory } = this.state;
    if (fetchingHistory) return;
    try {
      await this.setState({ fetchingHistory: true });
      const graphData = await api.get(
        `/private_tokens/${id}/history.json`,
        { category, limit },
        true
      );
      console.log("graph data", graphData);
      await this.setState({ graphData });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ fetchingHistory: false });
    }
  };

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  createPrivateToken = async (
    symbol,
    initial_price,
    charity,
    offers,
    description,
    category,
    social_links,
    images
  ) => {
    try {
      await this.setState({ creating: true });
      const form = new FormData();
      form.append("private_token[symbol]", symbol);
      form.append("private_token[initial_price]", initial_price);
      form.append("private_token[charity]", charity);
      form.append("private_token[offers]", offers);
      form.append("private_token[description]", description);
      form.append("private_token[category]", category);
      Object.keys(social_links).forEach(link => {
        form.append(`private_token[social_links][${link}]`, social_links[link]);
      });

      for (const file of images) {
        form.append("private_token[images][]", new Blob([file.image]));
      }

      await api.uploadFormData(
        "post",
        "/private_tokens.json",
        form,
        true
      );
      window.location = "/";
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ creating: false });
    }
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          getOrders: this.getOrders,
          createPrivateToken: this.createPrivateToken,
          buyToken: this.buyToken,
          sellToken: this.sellToken,
          takeToken: this.takeToken,
          getHistory: this.getHistory
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { TokenProvider, Consumer as TokenConsumer };

export default TokenContext;
