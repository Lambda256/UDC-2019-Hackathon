import React, { useState } from "react";
import Button from "../Components/Buttons/Button";
import CreateCardButton from "../Components/Buttons/Button_CreateCard";
import styled from "styled-components";

const Img = styled.img`
  height: 100%
  width: 100%
  padding: 60px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonDiv = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H2 = styled.h2`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
`;

export default () => {
  const [match, setMatch] = useState(false);
  const [time, setTime] = useState(false);

  const [countdown, setCountdown] = useState(9);

  const number = () => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setMatch(true);
    }
    return;
  };

  const startMatch = () => {
    setTime(true);
  };

  return (
    <div>
      {match ? (
        <Container>
          <div>
            <Img
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fbj28O1%2Fbtqx4rjO0Z2%2Fk7CXOCE1BrXsWGFLk46rKk%2Fimg.png"
              alt="dd"
            />
          </div>
          <ButtonDiv>
            <CreateCardButton />
          </ButtonDiv>
        </Container>
      ) : (
        <Container>
          <div>
            <Img
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbJr83T%2FbtqxYW0zR17%2Fol72BP14lJO5aA4jiM9NDk%2Fimg.png"
              alt="dd"
            />
          </div>
          <ButtonDiv>
            <H2>경기가 종료되면 카드가 발급됩니다.</H2>
            {time === true ? (
              <H2>
                {countdown}
                {number()}
              </H2>
            ) : (
              <div>
                <Button
                  text={"경기시작"}
                  onClick={startMatch}
                  size={"buyCard"}
                  borderRadius={"3px"}
                />
              </div>
            )}
          </ButtonDiv>
        </Container>
      )}
    </div>
  );
};
