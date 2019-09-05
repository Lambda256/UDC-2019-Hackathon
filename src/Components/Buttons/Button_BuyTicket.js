import React from "react";
import Button from "./Button";
import axios from "axios";
import { Config } from "../../js/config";

const TicketButton = () => {
  const onClick = () => {
    alert("구매하시겠습니까? 티켓 가격: 10000BCC");

    axios
      .post(
        `https://api.luniverse.net/tx/v1.0/transactions/setOwners`,
        {
          from: `${Config.walletAddress.pd}`,
          inputs: {
            _index: "0",
            _name: `${Config.userName}`
          }
        },
        {
          headers: {
            "api-key": `${Config.dapp.apiKey}`
          }
        }
      )
      .then(() => {
        alert("티켓을 구입하였습니다.");
        window.location.href = `http://localhost:3000/match`;
        // setOpen(true);
      })
      .catch(() => {
        alert("티켓 구입에 실패했습니다!");
      });

    axios
      .post(
        `https://api.luniverse.net/tx/v1.0/transactions/purchase`,
        {
          from: `${Config.walletAddress.user}`,
          inputs: {
            receiverAddress: `${Config.walletAddress.pd}`,
            valueAmount: "1000000000000000000000"
          }
        },
        {
          headers: {
            "api-key": `${Config.dapp.apiKey}`
          }
        }
      )
      .catch(() => {
        alert("지불 실패");
      });
  };

  return (
    <div>
      <Button
        text={"예매하기"}
        onClick={onClick}
        size={"buyTicket"}
        borderRadius={0}
      />
    </div>
  );
};

export default TicketButton;
