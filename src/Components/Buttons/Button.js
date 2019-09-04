import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const getSize = size => {
  let w;
  let h;
  if (size === "createCard") {
    w = 120;
    h = 60;
  } else if (size === "buyCard") {
    w = 180;
    h = 40;
  } else if (size === "buyTicket") {
    w = 150;
    h = 140;
  }
  return `
        width:${w}px;
        height:${h}px;
        `;
};

const StyledButton = styled.button`
  background: linear-gradient(45deg, #2196f3 30%, #21cbf3 90%);
  border: 0;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  ${props => getSize(props.size)}
  border-radius: ${props => props.borderRadius}
`;

const Button = ({ text, onClick, size = "sm", value, user, borderRadius }) => (
  <StyledButton
    onClick={onClick}
    size={size}
    value={value}
    name={user}
    borderRadius={borderRadius}>
    {text}
  </StyledButton>
);

Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;
