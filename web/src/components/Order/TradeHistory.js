import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import moment from "moment";
import _ from "lodash";

function HistoryItem(props) {
  return (
    <div className="row-align-center history-item">
      <div>{moment().format("MM-DD HH:mm:ss")}</div>
      <div>{_.random(0, 10000)}</div>
      <div>{_.random(0, 10000)}</div>
      <div>{_.random(0, 10000)}</div>
    </div>
  );
}

function TradeHistory(props) {
  return (
    <Card className="trade-history">
      <div className="title text-black">Trade History</div>
      <div className="content">
        <div className="row-align-center row-space-between text-grey header">
          <div>Filled At</div>
          <div>Price</div>
          <div>Amount (BTC)</div>
          <div>Total (TIME)</div>
        </div>

        <div>
          {new Array(20).fill(undefined).map((item, index) => {
            return <HistoryItem />;
          })}
        </div>
      </div>
    </Card>
  );
}

TradeHistory.propTypes = {};

TradeHistory.defaultProps = {};

export default TradeHistory;
