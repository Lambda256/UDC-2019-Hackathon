import React from "react";
import styled from "styled-components";
import TicketButton from "../Components/Buttons/Button_BuyTicket";
import CardButton from "../Components/Buttons/Button_BuyCard";
import CreateCardButton from "../Components/Buttons/Button_CreateCard";
// import MyBalance from "../Components/MyBalance";

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => {
  return (
    <Container>
      <div>
        <TicketButton />
        <CardButton />
        <CreateCardButton />
      </div>
      {/* <MyBalance margin="30px" /> */}
    </Container>
  );
};
