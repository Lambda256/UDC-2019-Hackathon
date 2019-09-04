import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import DefaultColors from '../../common/style/DefaultColors';

const TouchableSettingRowComponent = ({onPress, iconName, title}) => (
  <Container onPress={onPress}>
    <IconContainer>
      <Icon
        name={iconName}
        size={20}
        style={{color: DefaultColors.mainColorToneDown}}
      />
    </IconContainer>
    <TitleContainer>
      <Title>{title}</Title>
    </TitleContainer>
    <Icon name="chevron-right" size={25} color="#bbb" />
  </Container>
);

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const IconContainer = styled.View`
  width: 35px;
  margin-right: 5px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: #474747;
`;

export default TouchableSettingRowComponent;
