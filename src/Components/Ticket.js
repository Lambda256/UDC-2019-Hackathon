import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TicketButton from "./Buttons/Button_BuyTicket";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    margin: "10px",
    borderRadius: "0px",
    padding: 0
  },
  content: {
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr 1fr 3fr 3fr",
    gridAutoColumns: "minmax(100px, auto)",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    width: "100%",
    padding: 0
  },
  smallText: {
    fontSize: "13px"
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundSize: "cover"
  },
  imageContainer: {
    width: "50%",
    height: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: 0,
    left: 0
  },
  team: {
    display: "grid",
    gridTemplateRows: "5fr 1fr",
    alignItems: "center",
    justifyItems: "center",
    height: "100%",
    width: "70%",
    margin: 0,
    padding: "10px 0"
  },
  vs: {
    padding: 0,
    margin: 0
  }
}));

export default props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography component="h4" variant="h4">
          {props.date}
        </Typography>

        <Typography component="h4" variant="h4">
          {props.time}
        </Typography>
        <div className={classes.team}>
          <div className={classes.imageContainer}>
            <CardMedia
              className={classes.image}
              component="img"
              src={props.homeUrl}></CardMedia>
          </div>
          <Typography className={classes.smallText}>
            {props.homeTeam}
          </Typography>
        </div>
        <Typography
          component="h5"
          variant="h5"
          className={classes.vs}
          padding="1px">
          VS
        </Typography>
        <div className={classes.team}>
          <div className={classes.imageContainer}>
            <CardMedia
              className={classes.image}
              component="img"
              src={props.awayUrl}></CardMedia>
          </div>
          <Typography component="h5" variant="h5" className={classes.smallText}>
            {props.awayTeam}
          </Typography>
        </div>

        <Typography component="h6" variant="h6" className={classes.smallText}>
          {props.stadium}
        </Typography>
      </CardContent>

      <TicketButton />
    </Card>
  );
};
