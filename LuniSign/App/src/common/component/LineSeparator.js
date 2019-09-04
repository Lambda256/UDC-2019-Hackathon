import React from 'react';
import {View, Platform} from 'react-native';

const LineSeparator = () => (
  <View
    style={{
      borderBottomWidth: 1,
      borderColor: Platform.OS === 'ios' ? '#D4D4D4' : '#ededed',
      width: '100%',
    }}
  />
);

export default LineSeparator;
