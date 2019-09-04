import React, { useEffect, useContext } from "react";
import AppContext from "contexts/AppContext";
import TokenContext from "contexts/TokenContext";
import AuthContext from "contexts/AuthContext";
import { Icon, Input, Button } from "antd";
import PropTypes from "prop-types";
import SimpleProgress from "components/SimpleProgress";
import _ from "lodash";

const RowItem = props => {
  const { price, token, percent, lastChild } = props;
  return (
    <div className={`row-space-between row-item ${lastChild && "last"}`}>
      <div className="text-grey">
        {lastChild && (
          <Icon
            type="right"
            style={{ color: "white", fontSize: 10, marginRight: 8 }}
          />
        )}
        ${parseFloat(price).toFixed(2)}
      </div>
      <div className="text-grey">{token}</div>
      <div
        className={`text-grey percent ${percent < 0 ? "negative" : "positive"}`}
      >
        {parseFloat(percent).toFixed(2)}%
      </div>
    </div>
  );
};

const Sell = props => {
  const { currentCampaign } = useContext(AppContext);
  const { getWallet, fetchingWallet, wallet } = useContext(AuthContext);
  const { symbol } = currentCampaign;

  useEffect(() => {
    getWallet();
  }, [currentCampaign, getWallet]);


  if (fetchingWallet)
    return (
      <div className="medium-card input-container">
        <SimpleProgress />
      </div>
    );

  let currentTokenBalance = wallet && _.find(wallet.my_tokens, [
    "private_token_id",
    currentCampaign.id
  ]);
  return (
    <div className="medium-card input-container">
      <div className="card-header buy-sell-header text-grey uppercase">
        Current balance
      </div>

      <div className="current-token text-white uppercase">
        {currentTokenBalance ? currentTokenBalance.balance : 0}{" "}
        <span>{symbol}</span>
      </div>

      <div className="sell-input-container row-align-center">
        <Input placeholder="Input Price" />
        <Input className="quantity-input" placeholder="Quantity" />
        <div className="up-down-container">
          <Icon type="up" className="up-down-button" />
          <Icon type="down" className="up-down-button" />
        </div>
        <Button className="sell-button">SELL</Button>
      </div>
    </div>
  );
};

const BuySell = props => {
  const { currentCampaign } = useContext(AppContext);
  const { orders, getOrders, fetchingOrders } = useContext(TokenContext);

  useEffect(() => {
    getOrders(currentCampaign.id);
  }, []);

  const dummyData = _.range(0, 10).map((item, index) => {
    return {
      price: _.random(0, 50),
      token: _.random(1, 10),
      percent: _.random(-100, 100)
    };
  });

  if (fetchingOrders) {
    return (
      <div className="medium-card buy-sell-container">
        <SimpleProgress />
      </div>
    );
  }

  return (
    <div className="medium-card buy-sell-container">
      <div className="card-header buy-sell-header text-grey uppercase">Buy</div>
      <div className="row-space-between buy-sell-row">
        <b className="text-grey">Price</b>
        <b className="text-grey">EMI</b>
        <b className="text-grey percent">% to the current price</b>
      </div>

      {orders.map((item, index) => {
        return (
          <RowItem
            key={index}
            lastChild={index === dummyData.length - 1}
            {...item}
          />
        );
      })}

      {orders.length === 0 ? (
        <div className="no-orders text-grey">No sell orders available</div>
      ) : (
        <>
          <div className="total-conatiner">
            <div className="card-header buy-sell-header text-grey uppercase">
              Total
            </div>
            <div className="text-grey">
              7 <span>EMI</span> x $30.00
            </div>
            <div className="current-token text-white">
              210.00<span> USD</span>
            </div>
          </div>
          <Button className="buy-button">BUY</Button>
        </>
      )}

      <Sell />
    </div>
  );
};

export default BuySell;
