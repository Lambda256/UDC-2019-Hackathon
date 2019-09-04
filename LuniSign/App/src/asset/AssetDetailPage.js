import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import {inject, observer} from 'mobx-react';
import {NumberWithCommas} from '../common/function/NumberUtil';
import {BallIndicator} from 'react-native-indicators';
import TransactionListComponent from './component/TransactionListComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TransactionModalComponent from './component/TransactionModalComponent';
import messageProvider from '../common/MessageProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import styled from 'styled-components';
import DefaultColors from '../common/style/DefaultColors';
import images from '../dapp/image/images';

const AssetDetailPage = ({
  assetDetailStore,
  settingStore,
  walletStore,
  navigation,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await assetDetailStore.setIsLoadingTrue();
    await assetDetailStore.setInitialStore(
      navigation,
      settingStore.userTokenContractAddress,
    );
    await assetDetailStore.updateTransactions();
    await assetDetailStore.setIsLoadingFalse();
    return () => {
      assetDetailStore.reset();
    };
  }, [assetDetailStore, navigation, settingStore.userTokenContractAddress]);

  const popTransactionModal = txid => {
    assetDetailStore.popEthereumTransactionModal(txid);
  };

  const {navigate} = navigation;
  const props = navigation.state.params;
  console.log('assetDetailStore', assetDetailStore);
  return (
    <Container>
      <Spinner
        visible={assetDetailStore.isLoading}
        // textStyle={styles.indicatorText}
        overlayColor={'transparent'}
        customIndicator={
          <BallIndicator color={DefaultColors.mainColorToneDown} size={30} />
        }
      />
      <Header>
        {/*<SymbolImage source={images[props.icon]} />*/}
        <BalanceContainer>
          <Balance>
            {/*{NumberWithCommas(*/}
            {/*  walletStore.assets.find(asset => asset.symbol === props.symbol)*/}
            {/*    .balance,*/}
            {/*  0,*/}
            {/*)}*/}0
          </Balance>
          <SymbolText> {props.symbol}</SymbolText>
        </BalanceContainer>
        <ButtonContainer>
          <AssetButton
            activeOpacity={0.8}
            onPress={() =>
              navigate({
                routeName: 'AssetSendPage',
                params: navigation.state.params,
              })
            }>
            <View>
              <ButtonText>{messageProvider.asset.send}</ButtonText>
            </View>
          </AssetButton>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigate({
                routeName: 'AssetReceivePage',
                params: navigation.state.params,
              })
            }>
            <View>
              <ButtonText>{messageProvider.asset.receive}</ButtonText>
            </View>
          </TouchableOpacity>
        </ButtonContainer>
      </Header>
      <TitleBar>
        <Title>{messageProvider.asset.transaction_list}</Title>
      </TitleBar>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={assetDetailStore.isRefreshing}
            onRefresh={() => assetDetailStore.handleRefresh(walletStore)}
          />
        }>
        {/*<TransactionListComponent*/}
        {/*  onPress={() => popTransactionModal()}*/}
        {/*  transactionList={assetDetailStore.transactions}*/}
        {/*  assetDetailStore={assetDetailStore}*/}
        {/*/>*/}
        {assetDetailStore.transactions.length >= 20 && (
          <MoreTransaction>
            <TouchableOpacity
              // onPress={assetDetailStore.searchEtherscanAddress}
              style={{flexDirection: 'row', justifyContent: 'center'}}>
              <MoreTransactionText>
                {messageProvider.asset.show_more}
              </MoreTransactionText>
              <Icon name="chevron-right" size={13} color="#bbb" />
            </TouchableOpacity>
          </MoreTransaction>
        )}
      </ScrollView>
      {/*<TransactionModalComponent {...this.props} />*/}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const Header = styled.View`
  height: 180px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  padding-bottom: 5px;
`;

const SymbolImage = styled.Image`
  align-self: center;
  width: 50px;
  height: 50px;
  margin-vertical: 8px;
`;

const BalanceContainer = styled.View`
  flex-direction: row;
`;

const Balance = styled.Text`
  margin-vertical: 8px;
  color: #474747;
  font-size: 17px;
`;

const SymbolText = styled.Text`
  align-self: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const AssetButton = styled.TouchableOpacity`
  padding: 10px;
  width: 48%;
  margin-horizontal: 5px;
  margin-top: 10px;
  border-radius: 4px;
  align-items: center;
  background-color: ${DefaultColors.mainColorToneDown};
`;

const ButtonText = styled.Text`
  color: #fff;
`;

const TitleBar = styled.View`
  background-color: ${DefaultColors.lightGray};
  height: 30px;
  justify-content: flex-end;
  padding-horizontal: 10px;
  padding-bottom: 5px;
`;

const Title = styled.Text`
  font-size: 11px;
`;

const MoreTransaction = styled.View``;

const MoreTransactionText = styled.Text``;

AssetDetailPage.navigationOptions = screenProps => ({
  title: `${screenProps.navigation.getParam(
    'name',
  )} (${screenProps.navigation.getParam('symbol')})`,
});

export default inject('assetDetailStore', 'walletStore', 'settingStore')(
  observer(AssetDetailPage),
);
