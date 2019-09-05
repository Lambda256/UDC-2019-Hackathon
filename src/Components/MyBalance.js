import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Config } from "../js/config";

const Text = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-top: ${props => props.margin};
`;

const MyBalance = ({ margin }) => {
  const [balance, setBalance] = useState("");

  const getBalance = async () => {
    const balance = await axios
      .get(
        `https://api.luniverse.net/tx/v1.0/wallets/${Config.walletAddress.user}/${Config.mt.symbol}/${Config.st.symbol}/balance`,
        {
          headers: {
            Authorization: `Bearer ${Config.dapp.apiKey}`
          }
        }
      )
      .catch(() => {});

    setBalance(balance.data.data.balance);
  };

  getBalance();

  return (
    <Text margin={margin}>{Math.round(balance / 100000000000000000)} BCC</Text>
  );
};

export default MyBalance;
