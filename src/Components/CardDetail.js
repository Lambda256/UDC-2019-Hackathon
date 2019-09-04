import React from "react";
import CardUnit from "./Card";
import cards from "../players";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 70px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 60px;
`;

const pathname = window.location.pathname.split("/")[1];
const pathnameId = window.location.pathname.split("/")[2];
const card = cards[pathnameId];

const CardDetail = () => {
  return (
    <Container>
      {pathname === "player" ? (
        <Text>카드가 발급되었습니다.</Text>
      ) : (
        <Text>상세 페이지</Text>
      )}

      <CardUnit
        title={card.playername}
        subtitle={card.id}
        bgPhoto={card.url}
        width={"280px"}
      />
    </Container>
  );
};

export default CardDetail;
