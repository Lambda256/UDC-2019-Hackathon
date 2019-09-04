import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import messageProvider from '../../common/MessageProvider';
import DefaultColors from '../../common/style/DefaultColors';

const {width} = Dimensions.get('window');

const ApprovalButtonModal = ({
  isVisible,
  toggleModal,
  requestComplete,
  message,
  handlePressApprove,
  handlePressCancel,
}) => (
  <Modal
    isVisible={isVisible}
    backdropOpacity={0.4}
    swipeDirection={['down']}
    onSwipeComplete={toggleModal}
    style={{justifyContent: 'flex-end', marginBottom: -20}}>
    <ModalContainer>
      <InfoMessage>{message}</InfoMessage>
      {!requestComplete && (
        <ButtonContainer>
          <CancelButton onPress={toggleModal}>
            <CancelText>{messageProvider.common.cancel}</CancelText>
          </CancelButton>
          <ApproveButton onPress={handlePressApprove}>
            <ApproveText>{messageProvider.common.approval}</ApproveText>
          </ApproveButton>
        </ButtonContainer>
      )}
    </ModalContainer>
  </Modal>
);

const ModalContainer = styled.View`
  background-color: white;
  padding: 10px;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  border-radius: 25px;
  width: ${width};
  height: 200px;
`;

const InfoMessage = styled.Text`
  margin-vertical: 25px;
  color: ${DefaultColors.darkGray};
  font-weight: bold;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ApproveButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 13px;
  background-color: ${DefaultColors.mainColor};
  width: 42%;
  margin-left: 15px;
  border-radius: 20px;
`;

const ApproveText = styled.Text`
  font-size: 17px;
  text-align: center;
  font-weight: bold;
  color: white;
`;

const CancelButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 13px;
  background-color: ${DefaultColors.darkGray};
  width: 42%;
  margin-right: 15px;
  border-radius: 20px;
`;

const CancelText = styled.Text`
  font-size: 17px;
  color: white; //#7993bf;
  text-align: center;
  font-weight: bold;
`;

export default ApprovalButtonModal;
