import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tickets from "../Components/Ticket";

const useStyles = makeStyles(theme => ({
  container: {
    padding: "50px",
    borderRadius: 0,
    maxWidth: "1100px"
  },
  heroContent: {
    padding: theme.spacing(8, 0, 0)
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          Tickets
        </Typography>
      </Container>
      <Container className={classes.container}>
        <Tickets
          homeTeam="전북 현대"
          awayTeam="수원 삼성"
          homeUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK05_300300.png"
          awayUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK02_300300.png"
          time="16:00"
          date="09.28"
          stadium="전주월드컵"
        />
        <Tickets
          homeTeam="울산 현대"
          awayTeam="성남 FC"
          homeUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK01_300300.png"
          awayUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK08_300300.png"
          time="14:00"
          date="09.28"
          stadium="울산종합"
        />
        <Tickets
          homeTeam="대구 FC"
          awayTeam="제주 Utd"
          homeUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK17_300300.png"
          awayUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK04_300300.png"
          time="14:00"
          date="09.28"
          stadium="DGB대구은행파크"
        />
        <Tickets
          homeTeam="강원 FC"
          awayTeam="인천 Utd"
          homeUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK21_300300.png"
          awayUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK18_300300.png"
          time="14:00"
          date="09.29"
          stadium="춘천송암"
        />
        <Tickets
          homeTeam="FC서울"
          awayTeam="상주 상무"
          homeUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK09_300300.png"
          awayUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK23_300300.png"
          time="15:00"
          date="09.29"
          stadium="서울월드컵"
        />
        <Tickets
          homeTeam="경남 FC"
          awayTeam="포항 스틸러스"
          homeUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK20_300300.png"
          awayUrl="https://t1.daumcdn.net/thumb/R150x150ht.u/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmedia%2Fimg-section%2Fsports13%2Flogo%2Fteam%2F6%2FK03_300300.png"
          time="16:00"
          date="09.29"
          stadium="창원축구센터"
        />
      </Container>
    </div>
  );
};
