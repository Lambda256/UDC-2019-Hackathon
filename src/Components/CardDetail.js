import React from "react";
import CardUnit from "./Card";
import cards from "../players";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const pathname = window.location.pathname.split("/")[1];
const pathnameId = window.location.pathname.split("/")[2];
const card = cards[pathnameId];

const CardDetail = ({ bgPhoto }) => {
  return (
    <Container>
      {pathname === "match" ? (
        <Text>카드가 발급되었습니다.</Text>
      ) : (
        <Text></Text>
      )}

      <CardUnit width={"300px"} bgPhoto={card ? card.url : bgPhoto} />
    </Container>
  );
};

export default CardDetail;
