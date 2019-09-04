import React, { useState } from "react";
import styled from "styled-components";
import CreateCardButton from "./Buttons/Button_CreateCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 120px;
`;

const CreateCard = () => {
  const [countdown, setCountdown] = useState(3);

  const number = () => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return;
  };

  return (
    <Container>
      <h2>경기가 종료되면 카드가 발급됩니다.</h2>

      {countdown === 0 ? <CreateCardButton /> : <p>{countdown}</p>}
      {number()}
    </Container>
  );
};

export default CreateCard;
