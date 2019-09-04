import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import messageProvider from '../../common/MessageProvider';
import styles from '../style/WalletImportPage.style';

const MnemonicWarningModal = ({isVisible, warningText, onPress}) => (
  <Modal isVisible={isVisible}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalDetailText}>{warningText}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.modalButton}>
          <Text style={{color: 'white'}}>{messageProvider.common.confirm}</Text>
        </View>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default MnemonicWarningModal;
