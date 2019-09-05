import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import MyBalance from "./MyBalance";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  "@import":
    "url('https://fonts.googleapis.com/css?family=Anton|Libre+Baskerville&display=swap')",
  icon: {
    marginRight: theme.spacing(5)
  },
  nav: {
    marginRight: "90px",
    fontFamily: "Varela Round"
  },
  appBar: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    color: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row"
  },
  link: {
    fontWeight: "600"
  },
  image: {
    height: "60px",
    width: "60px",
    position: "absolute",
    left: 0
  },
  button: {
    marginLeft: "50px",
    backgroundColor: "inherit"
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
}));

export default function Header() {
  const classes = useStyles();

  const resetCard = () => {
    localStorage.clear();
    localStorage.setItem("Me", "57,10");
    localStorage.setItem("Euijin", "24,25,26,55,56");
    localStorage.setItem("Sinhyeok", "27,28,29,53,54");
    localStorage.setItem("Hyeonjun", "30,31,23,51,52");
    localStorage.setItem("Jungho", "32,33,49,50");
    localStorage.setItem("Junhee", "34,35,36,37");
    localStorage.setItem(
      "noUser",
      "0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,38,39,40,41,42,43,44,45,46,47,48"
    );
    window.location.reload();
  };

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar>
        <Link color="inherit" href="/tickets" className={classes.nav}>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.typography}
            noWrap>
            Tickets
          </Typography>
        </Link>
        <Link color="inherit" href="/profile/Me" className={classes.nav}>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.typography}
            noWrap>
            Album
          </Typography>
        </Link>
        <Link color="inherit" href="/market" className={classes.nav}>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.typography}
            noWrap>
            Marketplace
          </Typography>
        </Link>
        <Link color="inherit" href="/explore" className={classes.nav}>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.typography}
            noWrap>
            Explore
          </Typography>
        </Link>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.typography}
          noWrap>
          <MyBalance />
        </Typography>
        <Button className={classes.button} onClick={resetCard}></Button>
      </Toolbar>
    </AppBar>
  );
}
