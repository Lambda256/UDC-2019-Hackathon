import React from 'react';
import {createStackNavigator} from 'react-navigation';
import CustomHeaderTitle from '../../common/component/CustomHeaderTitle';
import SettingPage from '../../setting/SettingPage';
import DefaultColors from '../../common/style/DefaultColors';

export const SettingStackNavigator = createStackNavigator(
  {
    SettingPage: {
      screen: SettingPage,
      navigationOptions: {
        title: '설정',
        headerTitleStyle: {
          color: 'white',
        },
      },
    },
  },
  {
    initialRouteName: 'SettingPage',
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: DefaultColors.mainColor,
      },
      headerTintColor: DefaultColors.mainColor,
    },
  },
);
