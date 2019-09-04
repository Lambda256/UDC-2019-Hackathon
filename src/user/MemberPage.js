import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Text,
  View,
  Platform,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import ToggleSwitch from 'toggle-switch-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import DefaultColors from '../common/style/DefaultColors';
import messageProvider from '../common/MessageProvider';
import mockData from '../MockData';
import images from './image/images';
import {ifIphoneX} from 'react-native-iphone-x-helper';

const {width} = Dimensions.get('window');

const MemberPage = ({navigation, memberInfoFormStore}) => {
  const userInfo = memberInfoFormStore.userInfo;
  const handlePressInfoChange = () => {
    navigation.navigate('MemberInfoFormPage');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <AvatarBackground />
        <AvatarModifyButton width={width}>
          <Icon name={'circle-edit-outline'} color={'white'} size={19} />
        </AvatarModifyButton>
        <AvatarContainer>
          <Avatar source={images.myAvatar} />
          <Text style={{fontSize: 19}}>
            <Bold>{userInfo.name}</Bold>님, 안녕하세요
          </Text>
        </AvatarContainer>
        <TitleContainer>
          <Title>회원 정보</Title>
          <CrtStatus
            crtfd={mockData.member.emailCrtfd}
            onPress={handlePressInfoChange}>
            <CrtStatusTitle crtfd={mockData.member.emailCrtfd}>
              변경하기
            </CrtStatusTitle>
          </CrtStatus>
        </TitleContainer>
        <InfoContainer>
          <InfoRow>
            <InfoTitle>{messageProvider.member.name}</InfoTitle>
            <InfoInput value={userInfo.name} editable={false} />
          </InfoRow>
          <InfoRow>
            <InfoTitle>{messageProvider.member.email}</InfoTitle>
            <InfoInput value={userInfo.email} editable={false} />
          </InfoRow>
          <InfoRow last={true}>
            <InfoTitle>{messageProvider.member.mobilePhone}</InfoTitle>
            <InfoInput value={userInfo.mobile} editable={false} />
          </InfoRow>
        </InfoContainer>
        <Divider />
        <ScrollViewWrapper>
          <View>
            <TitleContainer>
              <Title>개인 정보 제공 동의</Title>
            </TitleContainer>
            <PrivacyContainer>
              <PrivacyRow>
                <PrivacyTitle>{messageProvider.member.email}</PrivacyTitle>
                <ToggleSwitch
                  isOn={true}
                  onColor={DefaultColors.mainColorToneDown}
                  offColor={DefaultColors.gray}
                  onToggle={isOn => console.log('changed to : ', isOn)}
                />
              </PrivacyRow>
              <PrivacyRow>
                <PrivacyTitle>
                  {messageProvider.member.mobilePhone}
                </PrivacyTitle>
                <ToggleSwitch
                  isOn={true}
                  onColor={DefaultColors.mainColorToneDown}
                  offColor={DefaultColors.gray}
                  onToggle={isOn => console.log('changed to : ', isOn)}
                />
              </PrivacyRow>
              <PrivacyRow last={true}>
                <PrivacyTitle>사용 앱 정보</PrivacyTitle>
                <ToggleSwitch
                  isOn={false}
                  onColor={DefaultColors.mainColorToneDown}
                  offColor={DefaultColors.gray}
                  onToggle={isOn => console.log('changed to : ', isOn)}
                />
              </PrivacyRow>
            </PrivacyContainer>
          </View>
          <SubmitContainer>
            <Submit>
              <Text style={{color: 'white', fontSize: 16}}>적용</Text>
            </Submit>
          </SubmitContainer>
        </ScrollViewWrapper>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
	flex: 1;
	background-color: white; // ${DefaultColors.mainColor};
`;

const ScrollViewWrapper = styled.ScrollView`
  flex: 1;
`;

const AvatarContainer = styled.View`
  padding: 15px;
  align-items: center;
  padding-top: ${Platform.OS === 'ios' ? ifIphoneX(84, 64) : 20}px;
`;

const AvatarBackground = styled.View`
  position: absolute;
  width: 100%;
  background-color: ${DefaultColors.mainColor};
  padding-top: ${85 + (Platform.OS === 'ios' ? ifIphoneX(84, 64) : 20)}px;
`;

const AvatarModifyButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  position: absolute;
  top: 105px;
  left: ${props => props.width / 2 + 40}px;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background-color: #9e9e9e;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Avatar = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 65px;
  margin-bottom: 13px;
  border-width: 4px;
  border-color: ${DefaultColors.lightGray};
`;

const TitleContainer = styled.View`
  flex-direction: row;
  padding-top: 18px;
  padding-bottom: 3px;
  padding-horizontal: 15px;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

const InfoContainer = styled.View`
  padding-bottom: 10px;
`;

const InfoRow = styled.View`
  padding-horizontal: 15px;
  flex-direction: row;
  height: 40px;
  align-items: center;
  justify-content: space-between;
`;

const InfoTitle = styled.Text`
  width: 70px;
`;

const InfoInput = styled.TextInput`
  padding-vertical: 3px;
`;

const CrtStatusTitle = styled.Text`
  font-size: 13px;
  color: ${props => (props.crtfd ? DefaultColors.darkGray : 'white')};
`;

const CrtStatus = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: ${props =>
    props.crtfd ? 'white' : DefaultColors.mainColorToneDown};
  border: 1px solid
    ${props =>
      props.crtfd ? DefaultColors.darkGray : DefaultColors.mainColorToneDown};
  margin-left: 15px;
  width: 70px;
  padding-vertical: 5px;
  border-radius: 35px;
  align-items: center;
`;

const PrivacyContainer = styled.View`
  padding-top: 10px;
`;

const PrivacyTitle = styled.Text`
  width: 80px;
`;

const PrivacyRow = styled(InfoRow)`
  height: 50px;
  justify-content: space-between;
`;

const Divider = styled.View`
  height: 15px;
  width: 100%;
  background-color: ${DefaultColors.lightGray};
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const SubmitContainer = styled.View`
  height: 100%;
  width: 100%;
  bottom: 0px;
`;

const Submit = styled.TouchableOpacity`
  margin-top: 20px;
  bottom: 0px;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${DefaultColors.gray};
`;

export default inject('memberInfoFormStore')(observer(MemberPage));
