import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Icon, Button, Input } from "antd";
import AuthContext from "contexts/AuthContext";
import PropTypes from "prop-types";
import CircularProgress from "components/CircularProgress";
import hourToken from "assets/images/main-token@3x.png";
import purchaseImg from "assets/images/purchased.svg";
import tradeImg from "assets/images/trade.svg";
import redeemImg from "assets/images/redeem.svg";
import numeral from "numeral";
import moment from "moment";
import _ from "lodash";

const { TextArea } = Input;

const WalletRow = props => {
  const [collapsed, setCollapsed] = useState(true);
  let {
    id,
    type,
    balance,
    pending_balance,
    name,
    user,
    current_price,
    profile_picture,
    loading,
    symbol,
    onClick
  } = props;
  return (
    <div className="wallet-row">
      <div className=" row-align-center">
        <div className="flex-token row-align-center">
          <img className="profile-image" src={profile_picture} alt="" />
          <div>
            <div className="name-value text-white uppercase">{symbol}</div>
            <div className="subtitle text-grey">{name}</div>
          </div>
        </div>
        <div className="flex-balance">
          <div className="name-value text-white">
            {numeral(balance).format("0,00")}
          </div>
          <div className="subtitle text-grey">
            ({numeral(balance * current_price).format("$0,0.00")})
          </div>
        </div>
        <div className="flex-pending">
          <div className="name-value text-grey">
            {numeral(pending_balance).value() === 0 ? "ㅡ" : pending_balance}
          </div>
        </div>
        <div className="flex-action">
          <Button
            onClick={() => {
              if (loading) return;
              if (type === "main") {
                onClick();
                return;
              }
              setCollapsed(false);
            }}
          >
            {loading ? (
              <Icon type="loading" />
            ) : type === "main" ? (
              "Recharge"
            ) : (
              "Redeem"
            )}
          </Button>
        </div>
      </div>
      <div className={`collapsed-content ${collapsed && "collapsed"}`}>
        <div className="collapsed-body">
          <div className="text-grey uppercase redeem-request">
            Redeem request
          </div>
          <div className="row-align-center input-container">
            <div className="text-grey input-label">Topic:</div>
            <Input
              value={"Meeting request - Advices for the partnership strategy"}
            />
          </div>
          <div className="row-align-center input-container">
            <div className="text-grey input-label">Description:</div>
            <TextArea
              value={`Dear ${name},\n\nMy name is ${user.name}, co-founder at HUNT. We’d like to expand our 3rd Party alliance in our HUNT platform. We think that your previous experience about Hooli x Koogle alliance can give a great insight for us. Please let me know if you are available for giving some advices for us.\n\nBest regards,\n\n${user.name}`}
            />
          </div>
          <div className="row-align-center input-container">
            <div className="text-grey input-label">Hours:</div>
            <div className="row-align-center minus-plus-container">
              <Icon type="minus" className="minus-plus-button" />
              <Input className="hour-input text-grey" value={"1.0 hour"} />
              <Icon type="plus" className="minus-plus-button" />
            </div>
          </div>
          <div className="request-container row-align-center">
            <div className="text-grey input-label" />
            <Button className="request-button" onClick={() => onClick(id, 1)}>
              Request
            </Button>
            <div
              className="cancel-text text-grey hover-link"
              onClick={() => {
                setCollapsed(true);
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionRow = props => {
  const { category, amount, updated_at, symbol, price, tx_hash } = props;
  let action = "",
    description = "",
    img = null;
  if (category === "mint") {
    action = "Purchased";
    img = purchaseImg;
    description = `${numeral(amount).format("0,0.00")} ${symbol} at ${numeral(
      price
    ).format("0,0.00")} HOUR`;
  } else if (category === "burn") {
    action = "Redeemed";
    img = redeemImg;
    description = `${numeral(amount).format("0,0.00")} ${symbol}`;
  } else if (category === "sell") {
    action = "Traded";
    img = tradeImg;
    description = `${numeral(amount).format("0,0.00")} ${symbol} at ${numeral(
      price
    ).format("0,0.00")} HOUR`;
  }

  return (
    <div className="transaction-row row-align-center">
      <img src={purchaseImg} alt="" />
      <div>
        <div className="text-grey purchased-text">
          {action} <span className="text-white">{description}</span>
        </div>
        <div className="text-grey">
          Status: success | TxHash: <a href="#">{tx_hash}</a>
        </div>
        <div className="time-ago text-dark-grey">
          {moment(updated_at).fromNow()}
        </div>
      </div>
    </div>
  );
};

const Wallet = props => {
  const {
    user,
    wallet,
    fetchingWallet,
    getWallet,
    recharge,
    redeem,
    recharging
  } = useContext(AuthContext);
  useEffect(() => {
    getWallet();
  }, []);

  if (!user) return <Redirect to="/login" />;

  if (!wallet || fetchingWallet) return <CircularProgress />;

  const {
    hour_balance,
    my_tokens,
    private_tokens,
    private_transactions
  } = wallet;

  let totalBalance = 0;

  totalBalance += numeral(hour_balance).value();

  my_tokens.forEach(tok => {
    const privateToken = _.find(private_tokens, ["id", tok.private_token_id]);
    totalBalance +=
      numeral(tok.balance).value() *
      numeral(privateToken.current_price).value();
  });

  return (
    <div className="wallet-page">
      <div className="content">
        <div className="wallet-text text-grey uppercase">Total Balance</div>
        <div className="usd-value text-white">
          {numeral(totalBalance).format("$0,0.00")}
        </div>
        <div className="border-container">
          <div className="wallet-header row-align-center text-grey">
            <div className="flex-token">Token</div>
            <div className="flex-balance">Balance</div>
            <div className="flex-pending">Pending</div>
            <div className="flex-action">Action</div>
          </div>
          <WalletRow
            type="main"
            user={{}}
            balance={hour_balance}
            current_price={1}
            symbol="HOUR"
            onClick={recharge}
            loading={recharging}
            name="Intime Main Token"
            profile_picture={hourToken}
          />
          {my_tokens.map((token, index) => {
            return (
              <WalletRow
                type="side"
                key={index}
                user={user}
                onClick={redeem}
                {...token}
                {..._.find(private_tokens, ["id", token.private_token_id])}
              />
            );
          })}
        </div>

        <div className="transaction-text text-grey uppercase">Transactions</div>
        <div className="border-container">
          {private_transactions.map((t, index) => {
            return (
              <TransactionRow
                key={index}
                {...t}
                {..._.find(private_tokens, ["id", t.private_token_id])}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

Wallet.propTypes = {};

Wallet.defaultProps = {};

export default Wallet;
