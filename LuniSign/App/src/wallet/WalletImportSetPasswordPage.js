import React from 'react';
import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import messageProvider from '../common/MessageProvider';
import PasswordSettingComponent from '../common/component/PasswordSettingComponent';
import {Button} from 'react-native-elements';
import styles from './style/WalletImportPage.style';
import {ifIphoneX} from 'react-native-iphone-x-helper';

class WalletImportSetPasswordPage extends React.Component {
  static navigationOptions = {
    title: messageProvider.wallet.import_wallet_set_password,
    headerTintColor: '#474747',
    headerTitleStyle: {
      color: '#474747',
    },
  };

  componentWillUnmount() {
    this.props.walletImportStore.reset();
  }

  render() {
    const passwordStore = this.props.passwordSettingStore;
    const props = this.props.walletImportStore;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={
              Platform.OS === 'ios' ? ifIphoneX(84, 64) : null
            }>
            <PasswordSettingComponent />
            <View style={styles.passwordSubmitContainer}>
              <Button
                type="clear"
                disabled={!passwordStore.isValidateSubmit}
                title={messageProvider.wallet.import_wallet}
                titleStyle={styles.submitButtonTitle}
                onPress={() =>
                  props.handlePressSubmitImport(
                    this.props.navigation.state.params,
                    // this.props.authStore,
                    this.props.settingStore,
                    this.props.passwordSettingStore,
                    this.props.walletStore,
                    this.props.bannerStore,
                  )
                }
                buttonStyle={[
                  styles.submitButton,
                  styles[passwordStore.isValidateSubmit ? 'validate' : ''],
                ]}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default inject(
  'passwordSettingStore',
  'walletImportStore',
  'settingStore',
  'walletStore',
  'bannerStore',
)(observer(WalletImportSetPasswordPage));
