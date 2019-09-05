import React, {useEffect} from 'react';
import {Platform, Dimensions} from 'react-native';
import {HeaderBackButton} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import {DotIndicator} from 'react-native-indicators';
import styled from 'styled-components';
import messageProvider from '../common/MessageProvider';
import DefaultColors from '../common/style/DefaultColors';
import ApprovalButtonModal from './component/ApprovalButtonModal';
const {height} = Dimensions.get('window');

const ConnectingPage = ({
  walletConnectStore,
  memberInfoFormStore,
  dappStore,
}) => {
  useEffect(() => {
    console.log(dappStore);
    return () => {
      walletConnectStore.handleComponentWillUnmount();
    };
  }, [dappStore, walletConnectStore]);

  const renderIndicator = () => {
    return (
      <IndicatorContainer>
        <DotIndicator color={DefaultColors.mainColor} size={15} />
      </IndicatorContainer>
    );
  };

  const renderConnectInfo = () => {
    const store = walletConnectStore;
    return (
      <InfoContainer>
        <HeaderContainer>
          <InfoCheck>
            {store.isConnected
              ? messageProvider.wallet.connect_complete
              : messageProvider.wallet.check_connect_info}
          </InfoCheck>
          <ConnectInfoContainer>
            <InfoTitle>{store.sessionPeerMeta.name}</InfoTitle>
            <InfoDesc>{store.sessionPeerMeta.url}</InfoDesc>
          </ConnectInfoContainer>
        </HeaderContainer>
        <InfoButtonContainer>
          {store.isDappRequestUserApprove && (
            <InfoApproveButton
              onPress={() =>
                store.handleApproveProvidingUserInfo(memberInfoFormStore)
              }>
              <ApproveText>개인정보 제공 동의</ApproveText>
            </InfoApproveButton>
          )}
        </InfoButtonContainer>
      </InfoContainer>
    );
  };

  return (
    <Container>
      {walletConnectStore.representationIcon !== '' && (
        <RprImage source={{uri: walletConnectStore.representationIcon}} />
      )}
      {walletConnectStore.sessionPeerMeta.name
        ? renderConnectInfo()
        : renderIndicator()}
      <ApprovalButtonModal
        isVisible={walletConnectStore.isVisibleRequestModal}
        requestComplete={walletConnectStore.isModalCompleteRequest}
        message={walletConnectStore.requestMessage}
        toggleModal={walletConnectStore.toggleIsVisibleRequestModal}
        handlePressApprove={walletConnectStore.handleModalApproveEvent}
      />
    </Container>
  );
};

ConnectingPage.navigationOptions = ({navigation}) => ({
  headerLeft: (
    <HeaderBackButton
      onPress={() => {
        navigation.pop(2);
      }}
    />
  ),
});

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 80px;
`;

const RprImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-bottom: ${Platform.OS === 'ios' ? 0 : 30}px;
  margin-top: ${Platform.OS === 'ios' ? height * 0.1 : 0}px;
`;

const InfoContainer = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' ? height * 0.1 : 0}px;
  padding-bottom: 25px;
  justify-content: space-between;
`;

const HeaderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

const InfoCheck = styled.Text`
  font-size: 22px;
  color: black;
  font-weight: bold;
`;

const ConnectInfoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin-bottom: 20px;
`;

const InfoTitle = styled.Text`
  color: #444444;
  text-align: left;
  font-size: 17px;
  margin-bottom: 15px;
`;

const InfoDesc = styled.Text`
  color: #444444;
  font-size: 15px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-horizontal: 20px;
`;

const ApproveButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 13px;
  background-color: ${DefaultColors.mainColor};
  width: 42%;
  margin-left: 15px;
  border-radius: 20px;
`;

const ApproveText = styled.Text`
  font-size: 17px;
  text-align: center;
  font-weight: bold;
  color: white;
`;

const InfoButtonContainer = styled(ButtonContainer)`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoApproveButton = styled(ApproveButton)`
  width: 90%;
`;

const IndicatorContainer = styled.View`
  flex: 1;
  padding-bottom: 50;
`;

export default inject('walletConnectStore', 'memberInfoFormStore', 'dappStore')(
  observer(ConnectingPage),
);
