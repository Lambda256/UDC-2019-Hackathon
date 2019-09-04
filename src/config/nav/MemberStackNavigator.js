import React from 'react';
import {createStackNavigator} from 'react-navigation';
import CustomHeaderTitle from '../../common/component/CustomHeaderTitle';
import MemberPage from '../../user/MemberPage';
import DefaultColors from '../../common/style/DefaultColors';
import MemberInfoFormPage from '../../user/MemberInfoFormPage';
import RemoveHeaderShadow from '../../common/style/RemoveHeaderShadow';

export const MemberStackNavigator = createStackNavigator(
  {
    MemberPage: {
      screen: MemberPage,
      navigationOptions: {
        headerTitle: <CustomHeaderTitle title={'회원'} />,
        header: null,
        headerMode: 'none',
      },
    },
    MemberInfoFormPage: MemberInfoFormPage,
  },
  {
    initialRouteName: 'MemberPage',
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerStyle: RemoveHeaderShadow,
    },
  },
);
