import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'native-base';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import Login from './component/Login';
import Register from './component/Register';

import Home from './component/AppTabNavigator/HomeTab';
import Marry from './component/AppTabNavigator/MarryTab';
import MarryDetail from './component/AppTabNavigator/MarryTabDetail';
import Board from './component/AppTabNavigator/BoardTab';
import BoardNew from './component/AppTabNavigator/BoardTabNew';
import BoardDetail from './component/AppTabNavigator/BoardTabDetail';
import Propose from './component/AppTabNavigator/ProposeTab';
import ProposeDetail from './component/AppTabNavigator/ProposeTabItem';
import Profile from './component/AppTabNavigator/ProfileTab';
import Party from './component/AppTabNavigator/PartyTab';

const MainStack = createStackNavigator({
  Login: Login,
  Register: Register,
});

const HomeStack = createStackNavigator({
  Home: Home,
  Party: Party,
});

const MarryStack = createStackNavigator({
  Marry: Marry,
  MarryDetail: MarryDetail
});

const BoardStack = createStackNavigator({
  Board: Board,
  BoardNew: BoardNew,
  BoardDetail: BoardDetail
});

const ProposeStack = createStackNavigator({
  Propose: Propose,
  ProposeDetail: ProposeDetail,
});

const AppTabNavigator = createBottomTabNavigator({
  HomeTab: {
    screen: HomeStack,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
      },
      tabBarIcon: ({ tintColor }) => (
        <Icon name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} size={24} />
      ),
    }
  },
  MarryTab: {
    screen: MarryStack,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
      },
      tabBarIcon: ({ tintColor }) => (
        <Icon name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} size={24} />
      ),
    },
  },
  BoardTab: {
    screen: BoardStack,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
      },
      tabBarIcon: ({ tintColor }) => (
        <Icon name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} size={24} />
      ),
    },
  },
  ProposeTab: {
    screen: ProposeStack,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
      },
      tabBarIcon: ({ tintColor }) => (
        <Icon name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'} size={24}/>
      ),
    },
  },
});

const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: AppTabNavigator,
  },
  '내 정보': {
    screen: Profile,
  },
}, {
  initialRouteName: 'Home'
});

const SwitchNavigation = createSwitchNavigator({
  routeOne: { screen: MainStack, },
  routeTwo: { screen: AppDrawerNavigator },
}, {
    initialRouteName: 'routeOne',
  });

const AppTabContainer = createAppContainer(SwitchNavigation);

export default class App extends Component {
  render() {
    return (
      <AppTabContainer />
    );
  }
}