import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';

const SettingTitleComponent = ({title}) => (
  <SettingTitle>
    <Text style={{fontSize: 11}}>{title}</Text>
  </SettingTitle>
);

const SettingTitle = styled.View`
  height: 40px;
  justify-content: flex-end;
  width: 100%;
  padding-horizontal: 15px;
  padding-bottom: 5px;
`;

export default SettingTitleComponent;
