import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
    url(${props => props.bgPhoto});
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
  height: 430px;
  width: ${props => props.width};
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: white;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const ContentColumn = styled.div``;

const Title = styled.span`
  font-size: 24px;
  font-weight: 900;
  color: white;
`;

const Subtitle = styled.span`
  margin-top: 8px;
  font-size: 14px;
  display: block;
  color: white;
`;

const IconContainer = styled.div`
  cursor: pointer;
  color: ${props => props.color};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  width: 100%;
  z-index: 0;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardUnit = ({
  title,
  subtitle,
  borderBottomColor = "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
  iconName,
  iconSize = 2,
  iconColor,
  bgPhoto,
  borderRadius = "5px",
  width = 270
}) => (
  <Container
    bgPhoto={bgPhoto}
    borderBottomColor={borderBottomColor}
    borderRadius={borderRadius}
    width={width}>
    <Top>
      {iconName && (
        <IconContainer color={iconColor}>
          <i className={`${iconName} fa-${iconSize}x`} />
        </IconContainer>
      )}
    </Top>

    {(title || subtitle) && (
      <Content>
        <ContentColumn>
          <TitleContainer>{title && <Title>{title}</Title>}</TitleContainer>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </ContentColumn>
      </Content>
    )}
  </Container>
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
