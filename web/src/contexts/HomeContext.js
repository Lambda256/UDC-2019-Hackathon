import React, { Component } from "react";
import api from "utils/api";
import { handleErrorMessage } from "utils/errorMessage";

const HomeContext = React.createContext();
const { Provider, Consumer } = HomeContext;

class HomeProvider extends Component {
  state = {
    tokens: [],
    fetchingTokens: false
  };

  componentDidMount() {}

  getTokens = async cb => {
    const { tokens } = this.state;
    if (tokens.length > 0) cb(tokens);
    try {
      await this.setState({ fetchingTokens: true });
      const tokens = await api.get("/private_tokens.json", {});
      console.log("tokens", tokens);
      this.setState({ tokens });
      cb && cb(tokens);
    } catch (e) {
      handleErrorMessage(e);
    } finally {
      await this.setState({ fetchingTokens: false });
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
          updateState: this.updateState,
          getTokens: this.getTokens
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { HomeProvider, Consumer as AppConsumer };

export default HomeContext;
