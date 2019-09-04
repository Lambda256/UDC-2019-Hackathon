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
    if(buying) return;
    try {
      await this.setState({buying: true});
      await api.patch(`/orders/${take_id}/take.json`, {}, true);
      notification["success"]({ message: "Buy order successfully taken." });
      const ordersClone = _.clone(orders);
      ordersClone.pop();
      this.setState({ orders: ordersClone });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({buying: false});
    }
  };

  sellToken = async (private_token_id, price, amount) => {
    const { orders, selling } = this.state;
    if(selling) return;
    try {
      const form = {order: {private_token_id, price, amount}};
      await this.setState({selling: true});
      const result = await api.post(`/orders`, form, true);
      notification["success"]({ message: "Sell order successfully posted." });
      const ordersClone = _.clone(orders);
      ordersClone.push(result);
      _.sortBy(ordersClone, ['price']);
      this.setState({ orders: ordersClone });
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({selling: false});
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
          buyToken: this.buyToken,
          sellToken: this.sellToken,
          takeToken: this.takeToken
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { TokenProvider, Consumer as TokenConsumer };

export default TokenContext;
