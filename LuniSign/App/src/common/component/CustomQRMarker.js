import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Header} from 'react-navigation';
import styled from 'styled-components';
import {inject, observer} from 'mobx-react';

const overlayColor = 'rgba(0,0,0,0.3)';
const {height, width} = Dimensions.get('window');

const CustomQRMarker = ({
  scannerStore,
  width,
  height,
  borderColor,
  borderWidth,
}) => {
  useEffect(() => {
    scannerStore.setIsAuthorizedTrue();
    return () => {
      scannerStore.setIsAuthorizedFalse();
    };
  }, [scannerStore]);

  const getSizeStyles = () => {
    return {
      width: width,
      height: height,
    };
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.finder, getSizeStyles()]}>
        <ScanText height={height}>QR코드 스캐너</ScanText>
        <DescView>
          <DescText>로그인을 위해</DescText>
          <DescText>QR코드를 스캔해주세요</DescText>
        </DescView>
        <View style={styles.topSpace} />
        <View style={styles.bottomSpace} />
        <View style={styles.leftSpace} />
        <View style={styles.rightSpace} />
        <View
          style={[
            {borderColor: borderColor},
            styles.topLeftEdge,
            {
              borderLeftWidth: borderWidth,
              borderTopWidth: borderWidth,
            },
          ]}
        />
        <View
          style={[
            {borderColor: borderColor},
            styles.topRightEdge,
            {
              borderRightWidth: borderWidth,
              borderTopWidth: borderWidth,
            },
          ]}
        />
        <View
          style={[
            {borderColor: borderColor},
            styles.bottomLeftEdge,
            {
              borderLeftWidth: borderWidth,
              borderBottomWidth: borderWidth,
            },
          ]}
        />
        <View
          style={[
            {borderColor: borderColor},
            styles.bottomRightEdge,
            {
              borderRightWidth: borderWidth,
              borderBottomWidth: borderWidth,
            },
          ]}
        />
      </View>
    </View>
  );
};

const ScanText = styled.Text`
  position: absolute;
  font-size: 30px;
  top: -80;
  color: white;
  font-weight: bold;
  z-index: 1;
`;

const DescView = styled.View`
  position: absolute;
  flex-direction: column;
  z-index: 1;
  bottom: -100;
  align-items: center;
`;

const DescText = styled.Text`
  color: white;
`;

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: Header.HEIGHT,
    // bottom: 0,
    left: 0,
  },
  finder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
  },
  topSpace: {
    position: 'absolute',
    backgroundColor: overlayColor,
    top: -(height - 250) / 2,
    height: (height - 250) / 2 + 4,
    width: width,
  },
  bottomSpace: {
    position: 'absolute',
    backgroundColor: overlayColor,
    top: 250 - 4,
    height: (height - 250) / 2,
    width: width,
  },
  leftSpace: {
    position: 'absolute',
    backgroundColor: overlayColor,
    top: 4,
    left: -((width - 250) / 2),
    height: 250 - 8,
    width: (width - 250) / 2 + 4,
  },
  rightSpace: {
    position: 'absolute',
    backgroundColor: overlayColor,
    top: 4,
    right: -((width - 250) / 2),
    height: 250 - 8,
    width: (width - 250) / 2 + 4,
  },
});

export default inject('scannerStore')(observer(CustomQRMarker));
