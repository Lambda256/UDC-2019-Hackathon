import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 50px;
`;
const Item = styled.div`
  margin: 50px;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
`;

let user1 = localStorage.getItem("user1").split(",");

let user2 = localStorage.getItem("user2").split(",");

let user3 = localStorage.getItem("user3").split(",");

const transfer = e => {
  let sender;
  let receiver;

  const { id } = e.target;

  switch (id) {
    case "1":
      sender = "user1";
      receiver = "user2";
      break;
    case "2":
      sender = "user2";
      receiver = "user3";
      break;
    case "3":
      sender = "user3";
      receiver = "user1";
      break;
    case "4":
      sender = "user1";
      receiver = "user3";
      break;
    case "5":
      sender = "user2";
      receiver = "user1";
      break;
    case "6":
      sender = "user3";
      receiver = "user2";
      break;
    default:
      console.log("error!");
  }

  const sendersItems = localStorage.getItem(sender).split(",");
  const receiversItems = localStorage.getItem(receiver).split(",");

  let CardId = "3";

  if (sendersItems.includes(CardId)) {
    let pos = sendersItems.indexOf(CardId);
    let removedItem = sendersItems.splice(pos, 1);
    localStorage.setItem(sender, sendersItems);
    let newArray = [];
    newArray.push(receiversItems);
    newArray.push(removedItem);
    localStorage.setItem(receiver, newArray);
  }
};

export default () => {
  return (
    <Container>
      <Item>user1: {user1} </Item>
      <Item>user2: {user2} </Item>
      <Item>user3: {user3} </Item>
      <Button id={1} onClick={transfer}>
        user1 -> user2
      </Button>
      <Button id={2} onClick={transfer}>
        user2 -> user3
      </Button>
      <Button id={3} onClick={transfer}>
        user3 -> user1
      </Button>
      <Button id={4} onClick={transfer}>
        user1 -> user3
      </Button>
      <Button id={5} onClick={transfer}>
        user2 -> user1
      </Button>
      <Button id={6} onClick={transfer}>
        user3 -> user2
      </Button>
    </Container>
  );
};

// const consoles = () => {
//   console.log("user1: " + user1);
//   console.log("user2: " + user2);
//   console.log("user3: " + user3);
// };

// consoles();
