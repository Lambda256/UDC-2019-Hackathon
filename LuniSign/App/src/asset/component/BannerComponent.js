import React from 'react';
import {Image, Dimensions} from 'react-native';
import styled from 'styled-components';
import images from '../image/images';
import openBrowser from '../../common/function/LinkUtil';

const {width} = Dimensions.get('window');

const BannerComponent = () => {
  const bannerUrl = 'https://www.luniverse.io';
  return (
    <Container onPressOut={() => openBrowser(bannerUrl)}>
      <BannerImage source={images.banner} />
    </Container>
  );
};

const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 70px;
  width: ${width - 30}px;
  left: 15px;
  right: 15px;
  bottom: 25px;
  border-radius: 8px;
  shadow-color: #000000;
  shadow-radius: 4px;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.6;
  elevation: 5;
`;

const BannerImage = styled.Image`
  height: 80px;
  width: ${width - 40}px;
  border-radius: 8px;
  bottom: -4px;
`;

export default BannerComponent;
