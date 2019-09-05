import React, {useEffect} from 'react';
import {Text, Image, View, RefreshControl, ScrollView} from 'react-native';
import {inject, observer} from 'mobx-react';
import DefaultColors from '../common/style/DefaultColors';
import images from './image/images';
import styled from 'styled-components';

const DAppPage = ({dappStore, assetStore, walletStore, navigation}) => {
  useEffect(() => {
    assetStore.updateAssetByAddress(walletStore.address);
  }, [assetStore, walletStore]);

  return (
    <Container>
      <LoginContainer>
        <LoginTextContainer>
          <MediumText>로그인 페이지의</MediumText>
          <MediumText>
            <BoldText>QR코드를 </BoldText>
            촬영해주세요
          </MediumText>
        </LoginTextContainer>
        <LoginButton onPress={() => navigation.navigate('ScannerPage')}>
          <Image source={images.qrcode} style={{width: 20, height: 20}} />
          <LoginText>로그인하기</LoginText>
        </LoginButton>
      </LoginContainer>
      <Divider />
      <DAppList
        refreshControl={
          <RefreshControl
            refreshing={dappStore.isRefreshing}
            onRefresh={dappStore.handleRefreshing}
          />
        }>
        <ListTitleContainer>
          <ListTitle>사용 목록</ListTitle>
        </ListTitleContainer>
        {dappStore.dappList.length > 0 ? (
          dappStore.dappList.map((value, index) => (
            <DAppItem key={index}>
              <DAppInfo>
                <IconImage source={{uri: value.icons[0]}} />
                <Text>{value.name}</Text>
              </DAppInfo>
              <SignedStatus signed={value.isProvided}>
                <StatusText signed={value.isProvided}>
                  {value.isProvided ? 'ON' : 'OFF'}
                </StatusText>
              </SignedStatus>
            </DAppItem>
          ))
        ) : (
          <EmptyDAppContainer>
            <EmptyDAppText>사용중인 DApp이 없습니다</EmptyDAppText>
            <EmptyDAppText>루니사인으로 로그인해보세요 !</EmptyDAppText>
          </EmptyDAppContainer>
        )}
      </DAppList>
    </Container>
  );
};

const Container = styled.View`
	flex: 1;
	background-color: white; // ${DefaultColors.mainColor};
	justify-content: center;
	align-items: center;
`;

const LoginContainer = styled.View`
  width: 100%;
  height: 180px;
  justify-content: space-evenly;
  align-items: center;
`;

const LoginButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  padding: 15px;
  height: 55px;
  width: 85%;
  border-radius: 25;
  border-color: rgba(0, 0, 0, 0.1);
  background-color: ${DefaultColors.mainColorToneDown};
  justify-content: center;
  align-items: center;
`;

const LoginTextContainer = styled.View`
  align-items: center;
  font-size: 19px;
`;

const LoginText = styled.Text`
  color: white;
  margin-left: 10px;
  font-size: 16px;
`;

const Divider = styled.View`
  height: 15px;
  width: 100%;
  background-color: ${DefaultColors.lightGray};
`;

const ListTitleContainer = styled.View`
  padding-left: 15px;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: ${DefaultColors.gray};
  justify-content: center;
`;

const ListTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

const DAppList = styled.ScrollView`
  width: 100%;
  flex: 1;
`;

const DAppItem = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  flex-direction: row;
  height: 60px;
  border-bottom-width: 1px;
  border-bottom-color: ${DefaultColors.gray};
  justify-content: space-between;
  align-items: center;
`;

const DAppInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconImage = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const MediumText = styled.Text`
  font-size: 17px;
`;

const EmptyDAppContainer = styled.View`
  margin: 20px;
  flex: 1;
  height: 80px;
  border-radius: 10px;
  background-color: ${DefaultColors.lightGray};
  align-items: center;
  justify-content: center;
`;

const EmptyDAppText = styled.Text`
  color: #3e4652;
`;

const StatusText = styled.Text`
  color: ${({signed}) => (signed ? 'white' : DefaultColors.mainColor)};
`;

const SignedStatus = styled.View`
  background-color: ${({signed}) =>
    signed ? DefaultColors.mainColor : 'white'};
  border: 1px solid ${DefaultColors.mainColor};
  width: 50px;
  padding-vertical: 5px;
  border-radius: 25px;
  align-items: center;
`;

export default inject('dappStore', 'assetStore', 'walletStore')(
  observer(DAppPage),
);
