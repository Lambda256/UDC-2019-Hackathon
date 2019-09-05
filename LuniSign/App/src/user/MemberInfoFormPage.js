import React, {useEffect} from 'react';
import {TouchableWithoutFeedback, Keyboard, Text, Platform} from 'react-native';
import {inject, observer} from 'mobx-react';
import messageProvider from '../common/MessageProvider';
import DefaultColors from '../common/style/DefaultColors';
import mockData from '../MockData';
import styled from 'styled-components';
import MnemonicBackupModal from '../common/component/MnemonicBackupModal';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../wallet/style/WalletInitPage.style';
import {BallIndicator} from 'react-native-indicators';

const MemberInfoFormPage = ({navigation, memberInfoFormStore, walletStore}) => {
  useEffect(() => {
    if (navigation.state.routeName === 'MemberInfoInitPage') {
      memberInfoFormStore.userInfo = mockData.member;
    }
    memberInfoFormStore.setFormInfo(memberInfoFormStore.userInfo);
    return () => {};
  }, [memberInfoFormStore, navigation.state.routeName]);

  const handlePressSubmit = () => {
    console.log(' === start === ');
    memberInfoFormStore.setIsLoadingTrue();
    if (navigation.state.routeName === 'MemberInfoInitPage') {
      memberInfoFormStore
        .handlePressRegisterUser(walletStore, memberInfoFormStore)
        .then(result => {
          if (result) {
            memberInfoFormStore.setIsLoadingFalse();
            memberInfoFormStore.setIsVisibleBackUpModalTrue();
          }
          // navigation.navigate('MainBottomTabNavigator');
        });
    } else {
      navigation.navigate('MemberPage');
    }
  };

  const crtfdMessage = crtfd => {
    return crtfd ? '인증완료' : '인증';
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Spinner
          visible={memberInfoFormStore.isLoading}
          textStyle={styles.indicatorText}
          textContent={'지갑 생성 중'}
          overlayColor={'rgba(0, 0, 0, 0)'}
          customIndicator={
            <BallIndicator
              style={{zIndex: 1}}
              color={DefaultColors.mainColorToneDown}
              size={30}
            />
          }
        />
        <FormContainer>
          {navigation.state.routeName === 'MemberInfoInitPage' ? (
            <TitleContainer>
              <Title>회원 정보 등록</Title>
            </TitleContainer>
          ) : (
            <Title>{messageProvider.member.change_member_info}</Title>
          )}
          <InputTitle>이름</InputTitle>
          <InputRow>
            <InfoInput
              value={memberInfoFormStore.nameInput}
              onChangeText={memberInfoFormStore.handleChangeName}
              onFocus={memberInfoFormStore.handleFocusName}
              onBlur={memberInfoFormStore.handleBlurName}
              isFocused={memberInfoFormStore.isNameFocused}
            />
          </InputRow>
          <InputTitle>생년월일</InputTitle>
          <InputRow>
            <InfoInput
              value={memberInfoFormStore.yearInput}
              onChangeText={memberInfoFormStore.handleChangeYear}
              onFocus={memberInfoFormStore.handleFocusYear}
              onBlur={memberInfoFormStore.handleBlurYear}
              isFocused={memberInfoFormStore.isYearFocused}
              keyboardType={'number-pad'}
              maxLength={4}
            />
            <BirthText>년</BirthText>
            <InfoInput
              value={memberInfoFormStore.monthInput}
              onChangeText={memberInfoFormStore.handleChangeMonth}
              onFocus={memberInfoFormStore.handleFocusMonth}
              onBlur={memberInfoFormStore.handleBlurMonth}
              isFocused={memberInfoFormStore.isMonthFocused}
              keyboardType={'number-pad'}
              maxLength={2}
            />
            <BirthText>월</BirthText>
            <InfoInput
              value={memberInfoFormStore.dayInput}
              onChangeText={memberInfoFormStore.handleChangeDay}
              onFocus={memberInfoFormStore.handleFocusDay}
              onBlur={memberInfoFormStore.handleBlurDay}
              isFocused={memberInfoFormStore.isDayFocused}
              keyboardType={'number-pad'}
              maxLength={2}
            />
            <Text style={{marginLeft: 15}}>일</Text>
          </InputRow>
          <InputTitle>이메일</InputTitle>
          <InputRow>
            <InfoInput
              value={memberInfoFormStore.emailInput}
              onChangeText={memberInfoFormStore.handleChangeEmail}
              onFocus={memberInfoFormStore.handleFocusEmail}
              onBlur={memberInfoFormStore.handleBlurEmail}
              isFocused={memberInfoFormStore.isEmailFocused}
            />
            <CrtStatus crtfd={memberInfoFormStore.userInfo.emailCrtfd}>
              <CrtStatusTitle crtfd={memberInfoFormStore.userInfo.emailCrtfd}>
                {crtfdMessage(memberInfoFormStore.userInfo.emailCrtfd)}
              </CrtStatusTitle>
            </CrtStatus>
          </InputRow>
          <InputTitle>{'핸드폰'}</InputTitle>
          <InputRow>
            <InfoInput
              value={memberInfoFormStore.mobileInput}
              onChangeText={memberInfoFormStore.handleChangeMobile}
              onFocus={memberInfoFormStore.handleFocusMobile}
              onBlur={memberInfoFormStore.handleBlurMobile}
              isFocused={memberInfoFormStore.isMobileFocused}
            />
            <CrtStatus crtfd={memberInfoFormStore.userInfo.mobileCrtfd}>
              <CrtStatusTitle crtfd={memberInfoFormStore.userInfo.mobileCrtfd}>
                {crtfdMessage(memberInfoFormStore.userInfo.mobileCrtfd)}
              </CrtStatusTitle>
            </CrtStatus>
          </InputRow>
        </FormContainer>
        <SubmitContainer>
          <SubmitButton
            activeOpacity={0.8}
            disabled={!memberInfoFormStore.isChanged}
            isChanged={memberInfoFormStore.isChanged}
            onPress={handlePressSubmit}>
            <Text style={{color: 'white', fontSize: 18}}>
              {navigation.state.routeName === 'MemberInfoInitPage'
                ? '회원 가입'
                : '적용'}
            </Text>
          </SubmitButton>
        </SubmitContainer>
        <MnemonicBackupModal
          parentStore={memberInfoFormStore}
          isCreateModal={true}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
`;

const FormContainer = styled.View`
  flex: 1;
  padding-horizontal: ${Platform.OS === 'ios' ? '20' : '15'}px;
  padding-top: 30px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const Title = styled.Text`
  font-size: 22px;
  color: black;
  font-weight: bold;
  margin-bottom: 25px;
`;

const InputRow = styled.View`
  margin-bottom: 25px;
  flex-direction: row;
  align-items: center;
`;

const InputTitle = styled.Text`
  color: ${DefaultColors.darkGray};
  font-size: 12px;
`;

const InfoInput = styled.TextInput`
  flex: 1;
  margin-top: 5px;
  padding-left: 0;
  padding-top: ${Platform.OS === 'ios' ? '10' : '0'}px;
  padding-bottom: ${Platform.OS === 'ios' ? '10' : '5'}px;
  font-size: 16px;
  border-color: #d6d6d6;
  border-bottom-width: 1.5px;
  ${({isFocused}) => isFocused && `border-color: ${DefaultColors.mainColor};`};
`;

const CrtStatusTitle = styled.Text`
  font-size: 13px;
  color: white;
`;

const CrtStatus = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: ${props =>
    props.crtfd ? '#797979' : DefaultColors.mainColorToneDown};
  border: 1px solid
    ${props => (props.crtfd ? 'transparent' : DefaultColors.mainColorToneDown)};
  margin-left: 15px;
  width: 70px;
  height: 30px;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
`;

const SubmitContainer = styled.View`
  width: 100%;
  bottom: 0px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: ${({isChanged}) =>
    isChanged ? DefaultColors.mainColorToneDown : DefaultColors.gray};
  border-radius: 0;
  justify-content: center;
  align-items: center;
`;

const BirthText = styled.Text`
  padding-left: 15px;
  padding-right: 25px;
`;

export default inject(
  'memberInfoFormStore',
  'walletCreateStore',
  'walletStore',
  'passwordSettingStore',
  'bannerStore',
  'settingStore',
)(observer(MemberInfoFormPage));
