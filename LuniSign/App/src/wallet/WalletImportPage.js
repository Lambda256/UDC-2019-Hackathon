import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import {Button} from 'react-native-elements';
import {BallIndicator} from 'react-native-indicators';
import MnemonicWarningModal from './component/MnemonicWarningModal';
import messageProvider from '../common/MessageProvider';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './style/WalletImportPage.style';
import DefaultColors from '../common/style/DefaultColors';
import {ifIphoneX} from 'react-native-iphone-x-helper';

class WalletImportPage extends React.Component {
  static navigationOptions = {
    title: messageProvider.wallet.import_wallet,
    headerTintColor: DefaultColors.mainColorToneDown,
    headerTitleStyle: {
      color: '#474747',
    },
  };

  componentWillUnmount() {
    this.props.walletImportStore.reset();
  }

  render() {
    const store = this.props.walletImportStore;
    const passwordStore = this.props.passwordSettingStore;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={
              Platform.OS === 'ios' ? ifIphoneX(84, 64) : null
            }>
            <Spinner
              visible={store.isLoading}
              textStyle={styles.indicatorText}
              textContent={store.loadingText}
              overlayColor={'rgba(0, 0, 0, 0)'}
              customIndicator={
                <BallIndicator
                  style={{zIndex: 1}}
                  color={DefaultColors.mainColorToneDown}
                  size={30}
                />
              }
            />
            <View style={styles.warningContainer}>
              <Text>⚠️</Text>
              <Text style={styles.warningText}>{store.warningText}</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                contextMenuHidden={true}
                style={styles.mnemonicInput}
                vlaue={store.mnemonicInput}
                onChangeText={store.handleChangeMnemonic}
                placeholder={messageProvider.wallet.mnemonic_input_placeholder}
              />
            </View>
            <View style={styles.submitContainer}>
              <Button
                type="clear"
                titleStyle={styles.submitButtonTitle}
                title={messageProvider.wallet.mnemonic_word_validate}
                disabled={!passwordStore.isValidateSubmit}
                onPress={() =>
                  store.handlePressSubmitMnemonic(this.props.navigation)
                }
                buttonStyle={[
                  styles.submitButton,
                  passwordStore.isValidateSubmit
                    ? {backgroundColor: DefaultColors.mainColorToneDown}
                    : null,
                ]}
              />
            </View>
            <MnemonicWarningModal
              isVisible={store.isVisibleMnemonicWarningModal}
              warningText={store.mnemonicWarningText}
              onPress={store.toggleMnemonicWarningModal}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default inject('walletImportStore', 'passwordSettingStore')(
  observer(WalletImportPage),
);
