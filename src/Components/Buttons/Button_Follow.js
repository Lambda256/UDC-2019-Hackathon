import React, { useState } from "react";
import Button from "./Button";

const FollowButton = () => {
  const [following, setfollowing] = useState(false);

  const onClick = () => {
    if (following === true) {
      console.log("Unfollow");
      setfollowing(false);
    } else if (following === false) {
      console.log("Follow");
      setfollowing(true);
    }
  };

  if (following === true) {
    return <Button text={"Follow"} onClick={onClick} size={"buyCard"} />;
  } else if (following === false) {
    return <Button text={"Unfollow"} onClick={onClick} size={"buyCard"} />;
  }
};

export default FollowButton;
