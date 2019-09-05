import React, { Component } from "react";

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

class AppProvider extends Component {
  state = {
    timeSold: 0,
    updatingTime: false,
    currentCampaign: null
  };

  componentDidMount() {}

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  setTimeSold = async timeSold => {
    const start = this.state.timeSold;
    const end = timeSold;
    var range = end - start;
    if (range === 0) return;
    await this.setState({ updatingTime: true, timeSold });
    const meridianLabel = document.querySelector(".meridianLabel");
    var current = start;
    var increment = end > start ? 1 : -1;
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      current += increment;
      if (meridianLabel) {
        meridianLabel.textContent = `${current} HOURS`;
      }

      if (current === end) {
        this.setState({ updatingTime: false });
        clearInterval(this.interval);
      }
    }, 0.5);
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          updateState: this.updateState,
          setTimeSold: this.setTimeSold
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { AppProvider, Consumer as AppConsumer };

export default AppContext;
