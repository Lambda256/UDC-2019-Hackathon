import React from "react";
import Button from "./Button";
import axios from "axios";
import { Config } from "../../js/config";
import cards from "../../players";

const CreateCardButton = () => {
  let user0 = localStorage.getItem("user0").split(",");
  let user1 = localStorage.getItem("user1").split(",");
  let user2 = localStorage.getItem("user2").split(",");
  let user3 = localStorage.getItem("user3").split(",");
  let user4 = localStorage.getItem("user4").split(",");
  let user5 = localStorage.getItem("user5").split(",");
  let noUser = localStorage.getItem("noUser").split(",");

  const cardOwner = () => {
    cards.forEach(card => {
      if (user0.includes(card.id.toString())) {
        card.currentOwner = "user0";
      } else if (user1.includes(card.id.toString())) {
        card.currentOwner = "user1";
      } else if (user2.includes(card.id.toString())) {
        card.currentOwner = "user2";
      } else if (user3.includes(card.id.toString())) {
        card.currentOwner = "user3";
      } else if (user4.includes(card.id.toString())) {
        card.currentOwner = "user4";
      } else if (user5.includes(card.id.toString())) {
        card.currentOwner = "user5";
      } else if (noUser.includes(card.id.toString())) {
        card.currentOwner = "noUser";
      }
    });
  };

  cardOwner();

  const getNoUserCards = () => {
    let arr = [];
    cards.forEach(card => {
      if (card.currentOwner === "noUser") {
        arr.push(card);
      }
    });
    return arr;
  };

  const noUserCards = getNoUserCards();
  const onClick = () => {
    const random = Math.floor(Math.random() * noUserCards.length);

    const name = noUserCards[random].playername;
    const teamname = noUserCards[random].teamname;
    const playerPosition = noUserCards[random].position;
    const uniformNumber = noUserCards[random].uniformNumber;
    const playerWeight = noUserCards[random].weight;
    const playerHeight = noUserCards[random].height;
    const playerBirthday = noUserCards[random].birthday;

    axios
      .post(
        `https://api.luniverse.io/tx/v1.0/transactions/mint`,
        {
          from: `${Config.walletAddress.pd}`,
          inputs: {
            _name: name,
            _teamname: teamname,
            _position: playerPosition,
            _uniformNumber: uniformNumber,
            _weight: playerWeight,
            _height: playerHeight,
            _birthday: playerBirthday
          }
        },
        {
          headers: {
            "api-key": `${Config.dapp.apiKey}`
          }
        }
      )
      .then(() => {
        const cardId = noUserCards[random].id;
        console.log(cardId);

        let pos = noUserCards.indexOf(cardId);
        let removedItem = noUserCards.splice(pos, 1);
        console.log(noUserCards);
        console.log(removedItem[0].id);

        const noUserCardsId = [];
        noUserCards.forEach(card => {
          noUserCardsId.push(card.id);
        });

        localStorage.setItem("noUser", noUserCardsId);

        let newArray = [];
        user0 = localStorage.getItem("user0").split(",");
        newArray.push(user0);
        newArray.push(removedItem[0].id);
        localStorage.setItem("user0", newArray);
        alert(`카드 발행에 성공했습니다`);
        window.location.href = `http://localhost:3000/player/${removedItem[0].id}`;
      })
      .catch(() => {
        alert("카드 발행에 실패했습니다!");
      });
  };

  return <Button text={"카드 발행"} onClick={onClick} size={"buyCard"} />;
};

export default CreateCardButton;
