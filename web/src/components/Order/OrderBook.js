import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

import Book from "./Book";

const data = [
  {
    key: "1",
    price: 100,
    amount: 10,
    total: 10
  },
  {
    key: "2",
    price: 1000,
    amount: 100,
    total: 100
  },
  {
    key: "3",
    price: 10000,
    amount: 1000,
    total: 1000
  }
];
const OrderBook = props => {
  let maxValue = Number.NEGATIVE_INFINITY;
  data.forEach(item => {
    maxValue = Math.max(maxValue, item.total);
  });
  return (
    <Card className="order-book">
      <div className="order-book-title text-black">OrderBook</div>
      <div className="row-align-center row-space-between order-item">
        <div className="price">Price</div>
        <div>Amount (BTC)</div>
        <div>Total (TIME)</div>
      </div>
      <Book type="buy" data={data} maxValue={maxValue} />
      <div className="change-text">
        10,000,000 KRW (-6.02%) <span className="text-grey">$9,234.00</span>
      </div>
      <Book type="sell" data={data} maxValue={maxValue} />
    </Card>
  );
};

OrderBook.propTypes = {};

OrderBook.defaultProps = {};

export default OrderBook;
