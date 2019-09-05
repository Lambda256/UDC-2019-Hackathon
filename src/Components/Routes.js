import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Album from "../Routes/Album";
import Market from "../Routes/Market";
import Tickets from "../Routes/Tickets";
import Test from "../Routes/Test";
import Match from "../Routes/Match";
import CardDetail from "../Components/CardDetail";
import Explore from "../Routes/Explore";

const LoggedInRoutes = () => (
  <Switch>
    <Route path="/" exact component={Test} />
    <Route path="/market" component={Market} />
    <Route exact path="/album" component={Album} />
    <Route path="/tickets" component={Tickets} />
    <Route path="/player/:playerId" component={CardDetail} />
    <Route path="/album/:playerId" component={CardDetail} />
    <Route path="/profile/:username" component={Album} />
    <Route path="/match" component={Match} />
    <Route path="/explore" component={Explore} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component="{Auth}" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
