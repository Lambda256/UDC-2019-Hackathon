import React from 'react';
import {Platform} from 'react-native';
import TabBarIcon from '../../common/component/TabBarIcon';

export const TabBarNavigationOptions = (label, icon) => {
  return {
    tabBarLabel: label,
    tabBarIcon: ({focused}) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-${icon}` : `md-${icon}`}
      />
    ),
  };
};
