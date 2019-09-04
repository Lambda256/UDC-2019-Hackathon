import React, { useState } from "react";
import Button from "../Components/Buttons/Button";
import CreateCardButton from "../Components/Buttons/Button_CreateCard";

export default () => {
  const [match, setMatch] = useState(false);

  const onClick = () => {
    setMatch(true);
  };

  return (
    <div>
      {match ? (
        <CreateCardButton />
      ) : (
        <Button
          text={"경기완료"}
          onClick={onClick}
          size={"buyCard"}
          borderRadius={"3px"}
        />
      )}
    </div>
  );
};
