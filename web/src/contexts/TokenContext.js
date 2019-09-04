import React, { Component } from "react";
import api from "utils/api";
import { notification } from "antd";
import { handleErrorMessage } from "utils/errorMessage";

const TokenContext = React.createContext();
const { Provider, Consumer } = TokenContext;

class TokenProvider extends Component {
  state = {
    symbol: "",
    initial_price: 0,
    charity: "",
    biography: "",
    social_links: [],
    tokens: [],
    orders: [],
    fetchingOrders: false,
    holders: []
  };

  async componentDidMount() {
    // await this.getTokens();
    console.log("tokens", this.state.tokens);
  }

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
      this.setState({ orders });
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

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          getOrders: this.getOrders,
          buyToken: this.buyToken
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { TokenProvider, Consumer as TokenConsumer };

export default TokenContext;
