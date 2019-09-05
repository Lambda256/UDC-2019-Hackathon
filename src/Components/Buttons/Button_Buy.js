import React, { useState } from "react";
import Button from "./Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CardDetail from "../CardDetail";
import CardButton from "./Button_BuyCard";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "300px",
    height: "600px",
    backgroundColor: "black",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    color: "white"
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

const BuyButton = ({ value, user, price, imgUrl }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = e => {
    setOpen(true);
    const { value } = e.target;
    const user = e.target.name;

    let sender = user;
    let receiver = "Me";

    const sendersItems = localStorage.getItem(sender).split(",");
    const receiversItems = localStorage.getItem(receiver).split(",");

    let CardId = value;

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
  };

  return (
    <div>
      <Button
        text={"BUY"}
        onClick={onClick}
        size={"buyCard"}
        value={value}
        user={user}
      />
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <CardDetail className={classes.detail} bgPhoto={imgUrl} />
          <h2>카드를 구매하시겠습니까?</h2>
          <CardButton
            size={"buyCard"}
            text={"구매하기"}
            className={classes.button}
            value={value}
            user={user}
            price={price}
            imgUrl={imgUrl}></CardButton>
        </div>
      </Modal>
    </div>
  );
};

export default BuyButton;
