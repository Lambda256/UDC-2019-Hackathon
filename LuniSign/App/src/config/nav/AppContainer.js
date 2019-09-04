import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import SplashPage from '../../splash/SplashPage';
import WalletInitStackNavigator from './WalletInitStackNavigator';
import MainBottomTabNavigator from './MainBottomTabNavigator';
import MnemonicBackupPage from '../../wallet/MnemonicBackupPage';
import MemberInfoFormPage from '../../user/MemberInfoFormPage';
// import WalletAgreementPage from '../../wallet/WalletAgreementPage';

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      SplashPage: SplashPage,
      // AuthPage: AuthPage,
      // WalletAgreementPage: WalletAgreementPage,
      WalletInitStackNavigator: WalletInitStackNavigator,
      MainBottomTabNavigator: MainBottomTabNavigator,
      MnemonicBackupInitPage: MnemonicBackupPage,
      MemberInfoInitPage: MemberInfoFormPage,
    },
    {
      initialRouteName: 'SplashPage',
    },
  ),
);

export default AppContainer;
