import React, { useContext, useEffect } from "react";
import AppContext from "contexts/AppContext";
import TokenContext from "contexts/TokenContext";
import Chart from "components/Order/Chart";
import SimpleProgress from "components/SimpleProgress";
import BuySell from "./BuySell";
import TradeHistory from "./TradeHistory";

const Trade = props => {
  const { currentCampaign } = useContext(AppContext);
  const { getHistory, fetchingHistory, graphData, orders } = useContext(
    TokenContext
  );
  const { symbol } = currentCampaign;

  useEffect(() => {
    getHistory(currentCampaign.id, "sell", 100);
  }, [orders, currentCampaign.id, getHistory]);

  return (
    <div className="graph-container">
      <div className="card-header text-grey uppercase">
        Trade {symbol} Token
      </div>
      <div className="graph">
        {fetchingHistory ? (
          <SimpleProgress />
        ) : (
          <Chart graphData={graphData} width={720} />
        )}
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
