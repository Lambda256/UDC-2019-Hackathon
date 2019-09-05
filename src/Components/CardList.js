import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import cards from "../players";
import { Link } from "@material-ui/core";
import CardUnit from "./Card";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  grid: {
    display: "flex",
    justifyContent: "center"
  }
}));

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

const CardList = props => {
  const getMyCards = () => {
    let myCards = [];
    cards.forEach(card => {
      if (card.currentOwner === props.username) {
        myCards.push(card);
      }
    });
    return myCards;
  };

  const cardList = getMyCards();

  const classes = useStyles();
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {false || (
        <Grid container spacing={4}>
          {cardList.map(card => (
            <Grid
              item
              key={card.id}
              xs={12}
              sm={6}
              md={4}
              className={classes.grid}>
              <Link href={`/album/${card.id}`} className={classes.link}>
                <CardUnit
                  {...card}
                  iconName="fas fa-heart"
                  bgPhoto={card.url}
                  borderRadius={"8px"}
                  width={"280px"}
                  eventUrl={card.eventUrl}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
export default CardList;
