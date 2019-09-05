import React from "react";
import CardList from "../Components/CardList";
import CustomizedInputBase from "../Components/SearchBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  searchbar: {
    display: "flex",
    justifyContent: "center",
    padding: "30px"
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.searchbar}>
        <CustomizedInputBase />
      </div>
      <CardList username={"noUser"} />
    </div>
  );
};
