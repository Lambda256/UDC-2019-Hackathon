import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Input, InputNumber, Radio } from "antd";

const BuySell = props => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Card className="buy-sell">
      <div className="row-align-center tabs">
        <div
          onClick={() => setTabIndex(0)}
          className={`tab-item text-grey ${tabIndex === 0 && "buy"}`}
        >
          Buy
        </div>
        <div
          onClick={() => setTabIndex(1)}
          className={`tab-item text-grey ${tabIndex === 1 && "sell"}`}
        >
          Sell
        </div>
        <div
          onClick={() => setTabIndex(2)}
          className={`tab-item text-grey ${tabIndex === 2 && "history"}`}
        >
          History
        </div>
      </div>

      <div className="content">
        <div className="row-align-start input-item">
          <div className="row-category">Price</div>
          <Input placeholder="0" />
        </div>
        <div className="row-align-start input-item">
          <div className="row-category">Amount</div>
          <div className="row-amount">
            <Input placeholder="0" style={{ borderBottomWidth: 0 }} />
            <Radio.Group
              className="row-select"
              onChange={() => {}}
              defaultValue="a"
            >
              <Radio.Button value="a">25%</Radio.Button>
              <Radio.Button value="b">50%</Radio.Button>
              <Radio.Button value="c">75%</Radio.Button>
              <Radio.Button value="d">100%</Radio.Button>
            </Radio.Group>
          </div>
        </div>

        <div className="row-align-start input-item">
          <div className="row-category">Total</div>
          <div className="total-text text-black">0 BTC</div>
        </div>

        <Button
          size="large"
          style={{
            width: "100%",
            marginTop: 20,
            backgroundColor: tabIndex === 0 ? "#e2323a" : "#3077e8",
            color: "white"
          }}
        >
          {tabIndex === 0 ? "BUY" : "SELL"}
        </Button>
      </div>
    </Card>
  );
};

BuySell.propTypes = {};

BuySell.defaultProps = {};

export default BuySell;
