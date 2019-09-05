import React, {useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import DefaultColors from '../common/style/DefaultColors';
import SplashScreen from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image';
import {convertDecryptedArrayToObject} from '../common/function/CryptoUtil';
import {findUserFromContract} from '../dapp/repository/DAppRepository';
import {
  decryptWithPrivateKey,
  ethersWallet,
  loadWallet,
} from '../wallet/service/EthersService';

const SplashPage = ({
  navigation,
  walletStore,
  memberInfoFormStore,
  dappStore,
}) => {
  const {navigate} = navigation;

  useEffect(() => {
    setTimeout(async () => {
      SplashScreen.hide();
      const result = await isSignedUser(walletStore);
      if (result) {
        navigate('MainBottomTabNavigator');
      } else {
        navigate('MemberInfoInitPage');
      }
    }, 1000);
  }, [isSignedUser, memberInfoFormStore, navigate, walletStore]);

  const getUserInfoObjectByAddress = async (address, seedPhrase) => {
    try {
      await loadWallet(seedPhrase);
      const response = await findUserFromContract({from: address});
      const result = await response.json();

      const userInfoPlain = await decryptWithPrivateKey(
        ethersWallet.privateKey,
        convertDecryptedArrayToObject(result.data.res),
      );
      // console.log('decryptWithPrivateKey', userInfoPlain);
      return JSON.parse(userInfoPlain);
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isSignedUser = async ({address, seedPhrase}) => {
    if (address) {
      const userInfo = await getUserInfoObjectByAddress(address, seedPhrase);
      const dappList = await dappStore.getUsedDappListByAddress(address);

      if (dappList) {
        dappStore.updateDAppList(dappList);
      }

      if (userInfo) {
        memberInfoFormStore.setUserInfo(userInfo);
        return true;
      }
    }
    return false;
  };

  return <Container />;
};

const Container = styled.View`
	flex: 1;
	background-color: white; // ${DefaultColors.mainColor};
	justify-content: center;
	align-items: center;
`;

export default inject(
  'splashStore',
  'walletStore',
  'memberInfoFormStore',
  'dappStore',
)(observer(SplashPage));
