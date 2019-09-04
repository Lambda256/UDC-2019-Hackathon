import React from "react";
import MyProfile from "../Components/MyProfile";
import CardList from "../Components/CardList";

export default ({ match }) => {
  console.log(match.params.username);

  const { username } = match.params;

  return (
    <div>
      <MyProfile username={username} />
      <CardList username={username} />
    </div>
  );
};
