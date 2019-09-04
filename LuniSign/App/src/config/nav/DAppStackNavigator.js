import React from 'react';
import {createStackNavigator} from 'react-navigation';
import DAppPage from '../../dapp/DAppPage';
import DefaultColors from '../../common/style/DefaultColors';
import ScannerPage from '../../scanner/ScannerPage';
import ConnectingPage from '../../scanner/ConnectingPage';

export const DAppStackNavigator = createStackNavigator(
  {
    DAppPage: {
      screen: DAppPage,
      navigationOptions: {
        title: '로그인',
        headerTitleStyle: {
          color: 'white',
        },
        headerStyle: {
          backgroundColor: DefaultColors.mainColor,
        },
      },
    },
    ConnectingPage: {
      screen: ConnectingPage,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: DefaultColors.mainColorToneDown,
      },
    },
    ScannerPage: {
      screen: ScannerPage,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: 'white',
      },
    },
  },
  {
    initialRouteName: 'DAppPage',
    defaultNavigationOptions: {
      headerBackTitle: null,
    },
  },
);
