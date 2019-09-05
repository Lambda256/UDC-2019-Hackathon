import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import cards from "../players";
import BuyButton from "../Components/Buttons/Button_Buy";
import Avatar from "@material-ui/core/Avatar";
import CardUnit from "../Components/Card";
import { Link } from "react-router-dom";
import CustomizedInputBase from "../Components/SearchBar";

const useStyles = makeStyles(theme => ({
  "@import":
    "url('https://fonts.googleapis.com/css?family=Anton|Libre+Baskerville&display=swap')",
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1)
  },
  heroContent: {
    padding: theme.spacing(4, 0, 0)
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },

  profile: {
    width: "100%"
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    height: "350px"
  },
  cardContent: {
    flexGrow: 1,
    textAlign: "center",
    margin: "10px"
  },
  buyBotton: {
    marginTop: "20px"
  },
  username: {
    fontSize: "17px"
  },
  avatar: {
    width: "35px",
    height: "35px",
    marginRight: "20px"
  },
  currentOwner: {
    display: "flex",
    alignItems: "center",
    height: "60px"
  },
  cardUnit: {
    display: "flex",
    justifyContent: "center"
  },
  bcc: {
    fontSize: "20px"
  },
  searchbar: {
    display: "flex",
    justifyContent: "center",
    padding: "30px"
  }
}));

export default () => {
  const classes = useStyles();

  let Me = localStorage.getItem("Me").split(",");
  let Euijin = localStorage.getItem("Euijin").split(",");
  let Sinhyeok = localStorage.getItem("Sinhyeok").split(",");
  let Hyeonjun = localStorage.getItem("Hyeonjun").split(",");
  let Jungho = localStorage.getItem("Jungho").split(",");
  let Junhee = localStorage.getItem("Junhee").split(",");

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
      }
    });
  };

  cardOwner();

  const getCards = () => {
    let myCards = [];
    cards.forEach(card => {
      if (card.currentOwner !== "Me") {
        if (card.currentOwner !== "noUser") {
          myCards.push(card);
        }
      }
    });
    myCards.sort(() => {
      return Math.random() - Math.random();
    });
    return myCards;
  };

  const cardList = getCards();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          Card Market
        </Typography>
        <div className={classes.searchbar}>
          <CustomizedInputBase />
        </div>
      </Container>
      {/* <StyledCard /> */}
      {/* End hero unit */}
      <main>
        {/* Hero unit */}

        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={3}>
            {cardList.map(card => (
              <Grid item key={card.id} xs={6} sm={3} md={3}>
                <Card className={classes.card}>
                  <Link to={`/profile/${card.currentOwner}`}>
                    <CardContent className={classes.currentOwner}>
                      <Avatar
                        className={classes.avatar}
                        alt="Remy Sharp"
                        src="https://s.gravatar.com/avatar/3fae072e28108b110273b1b1b4fd01db?d=mm&s=70"
                      />
                      <Typography
                        variant="h5"
                        component="h5"
                        className={classes.username}>
                        {card.currentOwner}
                      </Typography>
                    </CardContent>
                  </Link>
                  <div className={classes.cardUnit}>
                    <CardUnit
                      title={card.playername}
                      subtitle="Card information"
                      iconName="fas fa-heart"
                      bgPhoto={card.url}
                      width={"280px"}
                      borderRadius={"3px"}
                      eventUrl={card.eventUrl}
                    />
                  </div>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h4">
                      {card.price}{" "}
                      <Typography variant="button" className={classes.bcc}>
                        BCC
                      </Typography>
                    </Typography>
                    <div className={classes.buyBotton}>
                      <BuyButton
                        value={card.id}
                        user={card.currentOwner}
                        price={card.price}
                        imgUrl={card.url}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};
