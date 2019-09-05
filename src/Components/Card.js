import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  border-radius: ${props => props.borderRadius};
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  background-position: center center;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 5px solid ${props => props.borderBottomColor};
  height: 480px;
  width: ${props => props.width};
`;

const IconContainer = styled.div`
  position: absolute;
`;

const IconContainer2 = styled.div`
  position: relative;
`;

const CardUnit = ({
  borderBottomColor = "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
  bgPhoto,
  borderRadius = "5px",
  width = 270,
  eventUrl
}) => (
  <div>
    <IconContainer>
      <IconContainer2>
        <Container
          bgPhoto={bgPhoto}
          borderBottomColor={borderBottomColor}
          borderRadius={borderRadius}
          width={width}
        />
      </IconContainer2>
    </IconContainer>

    <Container
      bgPhoto={eventUrl}
      borderBottomColor={borderBottomColor}
      borderRadius={borderRadius}
      width={width}
    />
  </div>
);

CardUnit.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  bgPhoto: PropTypes.string,
  borderBottomColor: PropTypes.string,
  tag: PropTypes.string,
  tagColor: PropTypes.string,
  tagBg: PropTypes.string
};

export default CardUnit;
