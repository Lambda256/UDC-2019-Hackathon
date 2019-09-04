import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "asyncComponent";

import Clock from "components/Clock";
const Header = asyncComponent(() => import("components/Header"));
const Home = asyncComponent(() => import("pages/Home"));
const Signup = asyncComponent(() => import("pages/Signup"));
const Login = asyncComponent(() => import("pages/Login"));
const Transactions = asyncComponent(() => import("pages/Transactions"));
const TokenDetail = asyncComponent(() => import("pages/TokenDetail"));

class Routes extends Component {
  render() {
    const hideClock =
      this.props.history.location.pathname.indexOf("/transactions") > -1 ||
      this.props.history.location.pathname.indexOf("/login") > -1 ||
      this.props.history.location.pathname.indexOf("/signup") > -1;
    return (
      <div id="content-body" className="content-body">
        {!hideClock && (
          <>
            <Header />
            <Clock />
          </>
        )}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/token/:symbol" component={TokenDetail} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/transactions" exact component={Transactions} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Routes);
