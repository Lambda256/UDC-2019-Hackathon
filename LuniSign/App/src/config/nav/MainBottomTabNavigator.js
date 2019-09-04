import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import {TabBarNavigationOptions} from './TabBarNavigationOptions';
import {MemberStackNavigator} from './MemberStackNavigator';
import messageProvider from '../../common/MessageProvider';
import DefaultColors from '../../common/style/DefaultColors';
import {AssetStackNavigator} from './AssetStackNavigator';
import {DAppStackNavigator} from './DAppStackNavigator';
import {SettingStackNavigator} from './SettingStackNavigator';

DAppStackNavigator.navigationOptions = TabBarNavigationOptions(
  messageProvider.common.wallet,
  'log-in',
);
AssetStackNavigator.navigationOptions = TabBarNavigationOptions(
  messageProvider.common.wallet,
  'wallet',
);
MemberStackNavigator.navigationOptions = TabBarNavigationOptions(
  messageProvider.common.scanner,
  'person',
);
SettingStackNavigator.navigationOptions = TabBarNavigationOptions(
  messageProvider.common.wallet,
  'settings',
);

const screensWithoutTabBar = [
  'PasswordPage',
  'PasswordConfirmPage',
  'AssetQRCodeScanPage',
  'ConnectingPage',
];

const MainBottomTabNavigator = createBottomTabNavigator(
  {
    DAppStackNavigator: DAppStackNavigator,
    AssetStackNavigator: AssetStackNavigator,
    MemberStackNavigator: MemberStackNavigator,
    SettingStackNavigator: SettingStackNavigator,
  },
  {
    initialRouteName: 'DAppStackNavigator',
    defaultNavigationOptions: ({navigation}) => {
      return {
        tabBarVisible:
          !navigation.state ||
          !screensWithoutTabBar.includes(
            (navigation.state.routes[navigation.state.routes.length - 1] || {})
              .routeName,
          ),
        tabBarOptions: {
          showLabel: false,
          activeTintColor: DefaultColors.mainColorToneDown,
          keyboardHidesTabBar: true,
          style: {
            ...Platform.select({
              ios: {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
              },
              android: {
                elevation: 20,
              },
            }),
          },
        },
        headerStyle: {
          backgroundColor: DefaultColors.mainColor,
        },
        headerTintColor: 'black',
      };
    },
  },
);

export default MainBottomTabNavigator;
