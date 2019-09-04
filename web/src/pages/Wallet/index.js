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
import _ from "lodash";

const { TextArea } = Input;

const WalletRow = props => {
  const [collapsed, setCollapsed] = useState(true);
  let {
    type,
    balance,
    pending_balance,
    name,
    current_price,
    profile_picture,
    symbol
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
          <Button onClick={() => setCollapsed(false)}>
            {type === "main" ? "Recharge" : "Redeem"}
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
              value={
                "Dear Mr. Belson,\n\nMy name is YoungHwi Cho, co-founder at HUNT. We’d like to expand our 3rd Party alliance in our HUNT platform. We think that your previous experience about Hooli x Koogle alliance can give a great insight for us. Please let me know if you are available for giving some advices for us.\n\nBest regards,\n\nYoungHwi"
              }
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
            <Button className="request-button">Request</Button>
            <div
              className="cancel-text text-grey hover-link"
              onClick={() => setCollapsed(true)}
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
  return (
    <div className="transaction-row row-align-center">
      <img src={purchaseImg} alt="" />
      <div>
        <div className="text-grey purchased-text">
          Purchased <span className="text-white">1 SEB at 2,356.36 HOUR</span>
        </div>
        <div className="text-grey">
          Status: success | TxHash:{" "}
          <a href="#">0x1354239f7a5bd237829c75182f71043f0be1f845a2549…</a>
        </div>
        <div className="time-ago text-dark-grey">3 mins ago</div>
      </div>
    </div>
  );
};

const Wallet = props => {
  const { user, wallet, fetchingWallet, getWallet } = useContext(AuthContext);
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
            balance={hour_balance}
            current_price={1}
            symbol="HOUR"
            name="Intime Main Token"
            profile_picture={hourToken}
          />
          {my_tokens.map((token, index) => {
            return (
              <WalletRow
                type="side"
                key={index}
                {...token}
                {..._.find(private_tokens, ["id", token.private_token_id])}
              />
            );
          })}
        </div>

        <div className="transaction-text text-grey uppercase">Transactions</div>
        <div className="border-container">
          <TransactionRow />
          <TransactionRow />
          <TransactionRow />
        </div>
      </div>
    </div>
  );
};

Wallet.propTypes = {};

Wallet.defaultProps = {};

export default Wallet;
