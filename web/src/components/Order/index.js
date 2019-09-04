import React from "react";
import PropTypes from "prop-types";

import Chart from "./Chart";
import OrderBook from "./OrderBook";
import BuySell from "./BuySell";
import TradeHistory from "./TradeHistory";

const Order = props => {
  return (
    <div>
      <div className="row-align-start">
        <div>
          <OrderBook />
          <BuySell />
          <TradeHistory />
        </div>
        <Chart />
      </div>
    </div>
  );
};

Order.propTypes = {};

Order.defaultProps = {};

export default Order;
