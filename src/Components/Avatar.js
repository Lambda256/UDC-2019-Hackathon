import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10,
    width: 130,
    height: 130
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <Avatar
      alt="Remy Sharp"
      src="https://s.gravatar.com/avatar/3fae072e28108b110273b1b1b4fd01db?d=mm&s=70"
      className={classes.avatar}
    />
  );
};
