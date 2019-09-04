import React, { useContext } from "react";
import AppContext from "contexts/AppContext";
import Chart from "components/Order/Chart";
import BuySell from "./BuySell";
import TradeHistory from "./TradeHistory";

const Trade = props => {
  const { currentCampaign } = useContext(AppContext);
  const { symbol } = currentCampaign;

  return (
    <div className="graph-container">
      <div className="card-header text-grey uppercase">
        Trade {symbol} Token
      </div>
      <div className="graph">
        <Chart />
      </div>
      <div className="card-container">
        <BuySell />
        <TradeHistory />
      </div>
    </div>
  );
};

Trade.propTypes = {};

Trade.defaultProps = {};

export default Trade;
