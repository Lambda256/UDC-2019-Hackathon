import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom></Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p">
        BLCA - Card Trading Dapp
      </Typography>
    </footer>
  );
}
