import React from 'react';
import {createStackNavigator} from 'react-navigation';
import AssetPage from '../../asset/AssetPage';
import DefaultColors from '../../common/style/DefaultColors';
import AssetDetailPage from '../../asset/AssetDetailPage';

export const AssetStackNavigator = createStackNavigator(
  {
    AssetPage: {
      screen: AssetPage,
      navigationOptions: {
        title: '자산',
        headerTitleStyle: {
          color: 'white',
        },
      },
    },
    AssetDetailPage: AssetDetailPage,
  },
  {
    initialRouteName: 'AssetPage',
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: DefaultColors.mainColor,
      },
      headerTintColor: DefaultColors.mainColor,
    },
  },
);
