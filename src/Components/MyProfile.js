import React from "react";
import Avatar from "./Avatar";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FollowButton from "./Buttons/Button_Follow";

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    display: "flex"
  },
  profileGrid: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%"
  }
}));

export default ({ username }) => {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <div className={classes.profileGrid}>
          <Avatar />
          <div className={classes.profile}>
            <Typography
              component="h3"
              variant="h4"
              align="left"
              color="textPrimary"
              gutterBottom>
              {username}
            </Typography>
            <Typography
              variant="h5"
              align="left"
              color="textSecondary"
              paragraph>
              User Information
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <FollowButton />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
