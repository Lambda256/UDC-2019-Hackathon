import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import messageProvider from '../common/MessageProvider';
import MnemonicWordsComponent from '../common/component/MnemonicWordsComponent';
import DefaultColors from '../common/style/DefaultColors';

const MnemonicBackupPage = ({navigation}) => {
  const mnemonicWords = navigation.getParam('mnemonicWords');
  const handlePressSubmit = navigation.getParam('handlePress');
  return (
    <SafeAreaContainer>
      <Container>
        <View>
          {navigation.state.routeName === 'MnemonicBackupInitPage' ? (
            <HeaderTitle>1단계. 지갑 백업</HeaderTitle>
          ) : (
            <HeaderTitle>지갑 백업</HeaderTitle>
          )}
          <Title>{messageProvider.wallet.please_write_mnemonic_word}</Title>
          <MnemonicWords>
            <MnemonicWordsComponent mnemonicWords={mnemonicWords} />
          </MnemonicWords>
          <View>
            <DescriptionTitle>
              {messageProvider.wallet.what_is_mnemonic_word}
            </DescriptionTitle>
            <DescriptionContent>
              {messageProvider.wallet.mnemonic_modal_desc_protect}
              {messageProvider.wallet.mnemonic_modal_desc_security}
            </DescriptionContent>
          </View>
        </View>
        <ButtonContainer>
          <Button onPress={handlePressSubmit} activeOpacity={0.8}>
            <ButtonText>다음</ButtonText>
          </Button>
        </ButtonContainer>
      </Container>
    </SafeAreaContainer>
  );
};

const SafeAreaContainer = styled.SafeAreaView`
  display: flex;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  display: flex;
  padding-horizontal: 15px;
  justify-content: space-between;
  padding-top: 30px;
`;

const HeaderTitle = styled.Text`
  font-size: 19px;
  color: black;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Title = styled.Text`
  color: #414141;
  font-size: 17px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const MnemonicWords = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const DescriptionTitle = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const DescriptionContent = styled.Text`
  font-size: 12px;
  color: #2a2a2a;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 15px;
`;

const Button = styled.TouchableOpacity`
  padding: 15px;
  height: 55px;
  margin-vertical: 0;
  border-radius: 30px;
  border-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: ${DefaultColors.mainColorToneDown};
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: 17px;
`;

export default MnemonicBackupPage;
