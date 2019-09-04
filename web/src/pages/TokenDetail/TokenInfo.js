import React, { useContext } from "react";
import { Popconfirm, Icon, Button, notification } from "antd";
import AppContext from "contexts/AppContext";
import AuthContext from "contexts/AuthContext";
import TokenContext from "contexts/TokenContext";
import LineChart from "./LineChart";
import wwf from "assets/images/wwf.svg";
import numeral from "numeral";

const TokenInfo = props => {
  const { currentCampaign } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const { buyToken, buyingToken } = useContext(TokenContext);
  const {
    id,
    symbol,
    supply: { total_sold },
    current_price
  } = currentCampaign;

  return (
    <div className="card-container">
      <div className="medium-card token-info">
        <div className="dollar-value text-white">
          {numeral(current_price).format("$0,0.00")}
        </div>
        <div className="card-subheader text-grey">per {symbol} token</div>
        <Popconfirm
          disabled={!user || buyingToken}
          className="popover"
          placement="bottom"
          title={`Are you sure you want to buy 1 ${symbol} for ${numeral(
            current_price
          ).format("$0,0.00")}？`}
          icon={<Icon type="question-circle-o" style={{ color: "#ee0804" }} />}
          onConfirm={() => buyToken(id, symbol)}
        >
          <Button className="buy-token" onClick={() => {
            if(!user) notification["error"]({message: "You need to be logged in to complete this action."})
          }}>
            {buyingToken ? <Icon type="loading" /> : `Buy ${symbol} Token`}
          </Button>
        </Popconfirm>
        <LineChart />
      </div>
      <div className="medium-card">
        <div className="dollar-value text-white">
          {numeral(total_sold).format("$0,0.00")}
        </div>
        <div className="card-subheader text-grey">funded to</div>
        <img className="donation-logo" src={wwf} alt="" />
      </div>
    </div>
  );
};

export default TokenInfo;
