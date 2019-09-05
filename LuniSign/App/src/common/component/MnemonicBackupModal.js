import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react';
import MnemonicWordsComponent from './MnemonicWordsComponent';
import messageProvider from '../MessageProvider';
import Modal from 'react-native-modal';
import modalStyles from '../style/ModalStyles';

class MnemonicBackupModal extends React.Component {
  render() {
    const store = this.props.parentStore;
    return (
      <Modal
        isVisible={store.isVisibleBackUpModal}
        onModalHide={store.handleBackupModalHide}>
        <View style={modalStyles.modalContainer}>
          <View>
            {this.props.isCreateModal && (
              <Text style={modalStyles.modalTitle}>
                회원 가입과 함께 지갑이 생성되었습니다!
              </Text>
            )}
            <Text style={modalStyles.modalTitle}>
              {messageProvider.wallet.please_write_mnemonic_word}
            </Text>
          </View>
          <View style={modalStyles.mnemonicWords}>
            <MnemonicWordsComponent mnemonicWords={store.mnemonicWords} />
          </View>
          <View>
            <Text style={modalStyles.descriptionTitle}>
              {messageProvider.wallet.what_is_mnemonic_word}
            </Text>
            <Text style={modalStyles.descriptionContent}>
              {messageProvider.wallet.mnemonic_modal_desc_protect}
              {messageProvider.wallet.mnemonic_modal_desc_security}
            </Text>
          </View>
          <View style={modalStyles.buttons}>
            <TouchableOpacity
              onPress={store.closeBackUpModal}
              style={modalStyles.button}
              activeOpacity={0.8}>
              <Text style={modalStyles.buttonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default observer(MnemonicBackupModal);
