import React, { useState } from "react";
import Button from "./Button";
import { makeStyles } from "@material-ui/core/styles";
import CreateCard from "../CreateCard";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import { Config } from "../../js/config";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "500px",
    height: "300px",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
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

const TicketButton = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    alert("구매하시겠습니까?");

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
            valueAmount: "100000000000000000000"
          }
        },
        {
          headers: {
            "api-key": `${Config.dapp.apiKey}`
          }
        }
      )
      // .then(() => {
      //   setTimeout(() => {
      //     window.location.reload(); //리턴값 가져오는 듯
      //   }, 2000);
      // })
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
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <CreateCard />
        </div>
      </Modal>
    </div>
  );
};

export default TicketButton;
