import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { Config } from "../../js/config";
import cards from "../../players";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CardUnit from "../Card";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "300px",
    height: "600px",
    backgroundColor: "black",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    color: "white"
  },
  h3: {
    fontWeight: "600",
    height: "20px"
  },
  detail: {
    position: "absolute",
    top: 0
  }
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const CreateCardButton = () => {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [itemUrl, setItemUrl] = useState("");
  // const [eventUrl, seteventUrl] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  let Me = localStorage.getItem("Me").split(",");
  let Euijin = localStorage.getItem("Euijin").split(",");
  let Sinhyeok = localStorage.getItem("Sinhyeok").split(",");
  let Hyeonjun = localStorage.getItem("Hyeonjun").split(",");
  let Jungho = localStorage.getItem("Jungho").split(",");
  let Junhee = localStorage.getItem("Junhee").split(",");
  let noUser = localStorage.getItem("noUser").split(",");

  const cardOwner = () => {
    cards.forEach(card => {
      if (Me.includes(card.id.toString())) {
        card.currentOwner = "Me";
      } else if (Euijin.includes(card.id.toString())) {
        card.currentOwner = "Euijin";
      } else if (Sinhyeok.includes(card.id.toString())) {
        card.currentOwner = "Sinhyeok";
      } else if (Hyeonjun.includes(card.id.toString())) {
        card.currentOwner = "Hyeonjun";
      } else if (Jungho.includes(card.id.toString())) {
        card.currentOwner = "Jungho";
      } else if (Junhee.includes(card.id.toString())) {
        card.currentOwner = "Junhee";
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

    return arr.sort(() => {
      return Math.random() - Math.random();
    });
  };

  const noUserCards = getNoUserCards();
  const onClick = () => {
    const random = Math.floor(Math.random() * noUserCards.length);

    console.log(random);

    const name = noUserCards[random].playername;
    const teamname = noUserCards[random].teamname;
    const playerPosition = noUserCards[random].position;
    const uniformNumber = noUserCards[random].uniformNumber;
    const playerWeight = noUserCards[random].weight;
    const playerHeight = noUserCards[random].height;
    const playerBirthday = noUserCards[random].birthday;

    axios
      .post(
        `https://api.luniverse.net/tx/v1.0/transactions/mint`,
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

        let pos = noUserCards.indexOf(cardId);
        let removedItem = noUserCards.splice(pos, 1);
        setItemUrl(removedItem[0].url);
        // seteventUrl(removedItem[0].eventUrl);

        const noUserCardsId = [];
        noUserCards.forEach(card => {
          noUserCardsId.push(card.id);
        });

        localStorage.setItem("noUser", noUserCardsId);

        let newArray = [];
        Me = localStorage.getItem("Me").split(",");
        newArray.push(Me);
        newArray.push(removedItem[0].id);
        localStorage.setItem("Me", newArray);
        alert(`카드 발행에 성공했습니다`);

        setOpen(true);
        // window.location.href = `http://localhost:3000/player/${removedItem[0].id}`;
      })
      .catch(() => {
        alert("카드 발행에 실패했습니다!");
      });
  };
  return (
    <div>
      <Button
        text={"카드 발행"}
        onClick={onClick}
        size={"buyCard"}
        borderRadius={"2%"}
      />
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <CardUnit
            className={classes.detail}
            bgPhoto={itemUrl}
            // eventUrl={eventUrl}
            borderRadius={"0px"}
            width={"300px"}
            height={"480px"}
          />
          <h3 className={classes.h3}>카드가 발행되었습니다.</h3>
          <Link to={"/profile/Me"}>
            <Button
              size={"buyCard"}
              text={"앨범으로 가기"}
              className={classes.button}></Button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default CreateCardButton;
