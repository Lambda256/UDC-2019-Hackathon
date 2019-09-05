import React, { useContext } from "react";
import _ from "lodash";
import moment from "moment";
import StepChart from "./StepChart";
import AppContext from "contexts/AppContext";
import TokenContext from "contexts/TokenContext";
import numeral from "numeral";

const RowItem = props => {
  const { price, updated_at } = props;
  return (
    <div className="row-space-between row-item">
      <div className="text-grey">${parseFloat(price).toFixed(2)}</div>
      <div className="text-grey percent">
        {moment(updated_at).format("YYYY-MM-DD HH:mm:ss")}
      </div>
    </div>
  );
};

const Circulating = props => {
  const { currentCampaign } = useContext(AppContext);
  const {
    symbol,
    supply: { total_redeem, circulating_supply }
  } = currentCampaign;
  return (
    <div className="medium-card buy-sell-container circulating-history">
      <div className="card-header buy-sell-header text-grey uppercase">
        Circulating History
      </div>
      <div className="current-token text-white uppercase">
        {parseInt(total_redeem)} <span>{symbol}</span>
      </div>
      <div className="token-burnt text-grey">
        {numeral(total_redeem / circulating_supply).format("0,0.00%")} tokens
        are burnt
      </div>
      <StepChart />
    </div>
  );
};

const TradeHistory = props => {
  const { graphData } = useContext(TokenContext);
  // const dummyData = _.range(0, 10).map((item, index) => {
  //   return { price: _.random(0, 50), date: moment() };
  // });
  return (
    <div className="medium-card buy-sell-container">
      <div className="card-header buy-sell-header text-grey uppercase">
        Trade History
      </div>
      <div className="row-space-between buy-sell-row">
        <b className="text-grey">Price</b>
        <b className="text-grey percent">Order filled at</b>
      </div>
      {_.takeRight(_.sortBy(graphData, ["updated_at"]), 6).map((item, index) => {
        return <RowItem key={index} {...item} />;
      })}

      <Circulating />
    </div>
  );
};

export default TradeHistory;
