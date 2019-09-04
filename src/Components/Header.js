import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import MyBalance from "./MyBalance";

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
    marginLeft: "50px"
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
    localStorage.setItem("Me", "23");
    localStorage.setItem("Euijin", "24,25,26");
    localStorage.setItem("Sinhyeok", "27,28,29");
    localStorage.setItem("Hyeonjun", "30,31");
    localStorage.setItem("Jungho", "32,33");
    localStorage.setItem("Junhee", "34");
    localStorage.setItem(
      "noUser",
      "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22"
    );

    window.location.reload();
  };

  return (
    <AppBar position="relative" className={classes.appBar}>
      {/* <CardMedia
        className={classes.image}
        component="img"
        src="http://wiki.hash.kr/images/thumb/6/6e/%EB%A3%A8%EB%8B%88%EB%B2%84%EC%8A%A4_%EB%A1%9C%EA%B3%A0.png/200px-%EB%A3%A8%EB%8B%88%EB%B2%84%EC%8A%A4_%EB%A1%9C%EA%B3%A0.png"></CardMedia> */}
      <Toolbar>
        <Link color="inherit" href="/" className={classes.nav}>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.typography}
            noWrap>
            Test
          </Typography>
        </Link>
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
            Card Market
          </Typography>
        </Link>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.typography}
          noWrap>
          <MyBalance />
        </Typography>
        <button className={classes.button} onClick={resetCard}>
          카드 초기화
        </button>
      </Toolbar>
    </AppBar>
  );
}
