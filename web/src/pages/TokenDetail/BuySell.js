import React, { useState, useEffect, useContext } from "react";
import AppContext from "contexts/AppContext";
import TokenContext from "contexts/TokenContext";
import AuthContext from "contexts/AuthContext";
import { Icon, Input, Button, Popconfirm } from "antd";
import SimpleProgress from "components/SimpleProgress";
import numeral from "numeral";
import _ from "lodash";

const RowItem = props => {
  const { price, percent, amount, current_price, lastChild } = props;

  const temp = numeral(current_price).value();
  const diff = (numeral(price).value() - temp) / temp;

  return (
    <div className={`row-space-between row-item ${lastChild && "last"}`}>
      <div className="text-grey">
        {lastChild && (
          <Icon
            type="right"
            style={{ color: "white", fontSize: 10, marginRight: 8 }}
          />
        )}
        {numeral(price).format("$0,0.00")}
      </div>
      <div className="text-grey">{amount}</div>
      <div
        className={`text-grey percent ${percent < 0 ? "negative" : "positive"}`}
      >
        {numeral(diff).format("0,0.00%")}
      </div>
    </div>
  );
};

const Sell = props => {
  const [inputPrice, setPrice] = useState("");
  const [inputAmount, setAmount] = useState("");
  const { currentCampaign } = useContext(AppContext);
  const { getWallet, fetchingWallet, wallet } = useContext(AuthContext);
  const { selling, sellToken, orders } = useContext(TokenContext);
  const { id, symbol } = currentCampaign;

  useEffect(() => {
    getWallet();
  }, [currentCampaign, getWallet, orders]);

  if (fetchingWallet)
    return (
      <div className="medium-card input-container">
        <SimpleProgress />
      </div>
    );

  let currentTokenBalance =
    wallet &&
    _.find(wallet.my_tokens, ["private_token_id", currentCampaign.id]);

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
        <Input
          placeholder="Input Price"
          prefix={<span className="text-white">$</span>}
          value={inputPrice}
          onChange={e => setPrice(e.target.value)}
        />
        <Input
          className="quantity-input"
          placeholder="Quantity"
          value={inputAmount}
          onChange={e => setAmount(e.target.value)}
        />
        <div className="up-down-container">
          <Icon
            type="up"
            className="up-down-button"
            onClick={() =>
              setAmount(
                Math.min(currentTokenBalance.balance, inputAmount + 0.1)
              )
            }
          />
          <Icon
            type="down"
            className="up-down-button"
            onClick={() => setAmount(Math.max(0, inputAmount - 0.1))}
          />
        </div>

        <Popconfirm
          disabled={selling}
          className="popover"
          placement="bottom"
          title={`Are you sure you want to sell ${numeral(inputAmount).format(
            "0,0.00"
          )} ${symbol} for ${numeral(
            numeral(inputAmount).value() * numeral(inputPrice).value()
          ).format("$0,0.00")}？`}
          icon={<Icon type="question-circle-o" style={{ color: "#ee0804" }} />}
          onConfirm={() => sellToken(id, inputPrice, inputAmount)}
        >
          <Button className="sell-button">
            {selling ? <Icon type="loading" /> : "SELL"}
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

const BuySell = props => {
  const { currentCampaign } = useContext(AppContext);
  const { buying, orders, getOrders, fetchingOrders, takeToken } = useContext(
    TokenContext
  );

  const { id, symbol, current_price } = currentCampaign;
  useEffect(() => {
    getOrders(id);
  }, [getOrders, id]);

  if (fetchingOrders) {
    return (
      <div className="medium-card buy-sell-container">
        <SimpleProgress />
      </div>
    );
  }

  const lastItem = orders[orders.length - 1];
  return (
    <div className="medium-card buy-sell-container">
      <div className="card-header buy-sell-header text-grey uppercase">Buy</div>
      <div className="row-space-between buy-sell-row">
        <b className="text-grey">Price</b>
        <b className="text-grey">{symbol}</b>
        <b className="text-grey percent">% to the current price</b>
      </div>

      {orders.map((item, index) => {
        return (
          <RowItem
            key={index}
            lastChild={index === orders.length - 1}
            current_price={current_price}
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
              {numeral(lastItem.amount).format("0.00")} <span>{symbol}</span> x
              ${numeral(lastItem.price).format("0,0.00")}
            </div>
            <div className="current-token text-white">
              {numeral(
                numeral(lastItem.amount).value() *
                  numeral(lastItem.price).value()
              ).format("0,0.00")}
              <span> USD</span>
            </div>
          </div>
          <Popconfirm
            disabled={buying}
            className="popover"
            placement="bottom"
            title={`Are you sure you want to buy 1 ${symbol} for ${numeral(
              numeral(lastItem.amount).value() * numeral(lastItem.price).value()
            ).format("$0,0.00")}？`}
            icon={
              <Icon type="question-circle-o" style={{ color: "#ee0804" }} />
            }
            onConfirm={() => takeToken(id, lastItem.id)}
          >
            <Button className="buy-button">
              {buying ? <Icon type="loading" /> : "BUY"}
            </Button>
          </Popconfirm>
        </>
      )}

      <Sell />
    </div>
  );
};

export default BuySell;
