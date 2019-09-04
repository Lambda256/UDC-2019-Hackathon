import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "asyncComponent";

import Clock from "components/Clock";
const Header = asyncComponent(() => import("components/Header"));
const Home = asyncComponent(() => import("pages/Home"));
const Signup = asyncComponent(() => import("pages/Signup"));
const Login = asyncComponent(() => import("pages/Login"));
const Wallet = asyncComponent(() => import("pages/Wallet"));
const Transactions = asyncComponent(() => import("pages/Transactions"));
const TokenDetail = asyncComponent(() => import("pages/TokenDetail"));

class Routes extends Component {
  render() {
    const hideHeader =
      this.props.history.location.pathname.indexOf("/transactions") > -1 ||
      this.props.history.location.pathname.indexOf("/login") > -1 ||
      this.props.history.location.pathname.indexOf("/signup") > -1;
    const hideClock =
      this.props.history.location.pathname.indexOf("/transactions") > -1 ||
      this.props.history.location.pathname.indexOf("/login") > -1 ||
      this.props.history.location.pathname.indexOf("/signup") > -1 ||
      this.props.history.location.pathname.indexOf("/wallet") > -1;
    return (
      <div id="content-body" className="content-body">
        {!hideHeader && <Header />}
        {!hideClock && <Clock />}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/token/:symbol" component={TokenDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/wallet" exact component={Wallet} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/transactions" exact component={Transactions} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Routes);
