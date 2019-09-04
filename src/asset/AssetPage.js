import React from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import styled from 'styled-components';
import {inject, observer} from 'mobx-react';
import DefaultColors from '../common/style/DefaultColors';
import images from './image/images';
import BannerComponent from './component/BannerComponent';
import {weiFormatEther} from '../wallet/service/EthersService';

const AssetPage = ({assetStore, walletStore, navigation}) => {
  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={assetStore.isRefreshing}
            onRefresh={() => assetStore.handleRefreshing(walletStore.address)}
          />
        }>
        {assetStore.assetList.length > 0 &&
          assetStore.assetList.map((value, index) => (
            <DAppItem
              // onPress={() =>
              //   navigation.navigate('AssetDetailPage', {symbol: index})
              // }
              key={index}>
              <DAppInfo>
                <IconImage source={images[value.icon]} />
                <Text>
                  {value.title}
                  {/*(*/}
                  {/*{value.stSymbol ? value.stSymbol : value.mtSymbol})*/}
                </Text>
              </DAppInfo>
              <View>
                <Amount>
                  {weiFormatEther(value.balance || 0)}{' '}
                  {value.stSymbol ? value.stSymbol : value.mtSymbol}
                </Amount>
              </View>
            </DAppItem>
          ))}
      </ScrollView>
      <BannerComponent />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
`;

const DAppItem = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  flex-direction: row;
  height: 70px;
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
  width: 30px;
  height: 30px;
  margin-right: 15px;
`;

const Amount = styled.Text`
  font-size: 18px;
`;

export default inject('assetStore', 'walletStore')(observer(AssetPage));
