import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DefaultColors from '../style/DefaultColors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={28}
        style={{marginBottom: -3}}
        color={this.props.focused ? DefaultColors.mainColorToneDown : '#b4b4b0'}
      />
    );
  }
}
