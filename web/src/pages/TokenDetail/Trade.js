import React, { useContext, useEffect } from "react";
import AppContext from "contexts/AppContext";
import TokenContext from "contexts/TokenContext";
import Chart from "components/Order/Chart";
import SimpleProgress from "components/SimpleProgress";
import BuySell from "./BuySell";
import TradeHistory from "./TradeHistory";

const Trade = props => {
  const { currentCampaign } = useContext(AppContext);
  const { getHistory, fetchingHistory, graphData } = useContext(TokenContext);
  const { symbol } = currentCampaign;

  useEffect(() => {
    getHistory(currentCampaign.id, "sell");
  }, [])

  return (
    <div className="graph-container">
      <div className="card-header text-grey uppercase">
        Trade {symbol} Token
      </div>
      <div className="graph">
        {fetchingHistory ? <SimpleProgress/> : <Chart graphData={graphData} />}
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
