import React from "react";
import Button from "./Button";
import axios from "axios";
import { Config } from "../../js/config";

const CardButton = ({ value, user, price }) => {
  const onClick = e => {
    const { value } = e.target;
    const user = e.target.name;

    let sender = user;
    let receiver = "Me";

    const sendersItems = localStorage.getItem(sender).split(",");
    const receiversItems = localStorage.getItem(receiver).split(",");

    let CardId = value;

    // console.log(sendersItems);
    // console.log(receiversItems);
    console.log(CardId);
    console.log(sender);

    if (user !== "Me") {
      if (sendersItems.includes(CardId)) {
        let pos = sendersItems.indexOf(CardId);
        let removedItem = sendersItems.splice(pos, 1);
        localStorage.setItem(sender, sendersItems);

        let newArray = [];
        newArray.push(receiversItems);
        newArray.push(removedItem);
        localStorage.setItem(receiver, newArray);
      } else {
        console.log("error");
      }
    }

    axios
      .post(
        `https://api.luniverse.net/tx/v1.0/transactions/buyCards`,
        {
          from: `${Config.walletAddress.user}`,
          inputs: {
            _tokenId: CardId /// 1번 카드를 살때
          }
        },
        {
          headers: {
            "api-key": `${Config.dapp.apiKey}`
          }
        }
      )
      .then(() => {
        alert(`${CardId}번 카드를 샀습니다. 가격: ${price}`);
      })
      .catch(() => {
        alert("실패했습니다");
      });

    axios
      .post(
        `https://api.luniverse.net/tx/v1.0/transactions/purchase`,
        {
          from: `${Config.walletAddress.user}`,
          inputs: {
            receiverAddress: `${Config.walletAddress.pd}`, /////// 수정해야함
            valueAmount: price * 100000000000000000 ///////////////////////////////가격 수정
          }
        },
        {
          headers: {
            "api-key": `${Config.dapp.apiKey}`
          }
        }
      )
      .then(() => {
        setTimeout(() => {
          window.location.reload(); //리턴값 가져오는 듯
        }, 2000);
      })
      .catch(() => {
        alert("지불 실패");
      });

    // window.location.reload();
  };

  return (
    <Button
      text={"BUY"}
      onClick={onClick}
      size={"buyCard"}
      value={value}
      user={user}
    />
  );
};

export default CardButton;
