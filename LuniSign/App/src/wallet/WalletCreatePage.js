import React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {inject, observer} from 'mobx-react';
import {BallIndicator} from 'react-native-indicators';
import {Button} from 'react-native-elements';
import PasswordSettingComponent from '../common/component/PasswordSettingComponent';
import MnemonicBackupModal from '../common/component/MnemonicBackupModal';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './style/WalletCreatePage.style';
import messageProvider from '../common/MessageProvider';
import DefaultColors from '../common/style/DefaultColors';

// @inject('walletCreateStore', 'passwordSettingStore', 'settingStore', 'walletStore', 'bannerStore')
class WalletCreatePage extends React.Component {
  static navigationOptions = {
    title: messageProvider.wallet.create_wallet,
    headerTintColor: DefaultColors.mainColorToneDown,
    headerTitleStyle: {
      color: '#474747',
    },
  };

  componentWillUnmount() {
    this.props.walletCreateStore.reset();
  }

  render() {
    const store = this.props.walletCreateStore;
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
            <PasswordSettingComponent />
            <View style={styles.submitContainer}>
              <Button
                type="clear"
                titleStyle={styles.submitButtonTitle}
                title={messageProvider.wallet.create_wallet}
                disabled={!passwordStore.isValidateSubmit}
                buttonStyle={[
                  styles.submitButton,
                  passwordStore.isValidateSubmit
                    ? {backgroundColor: DefaultColors.mainColorToneDown}
                    : null,
                ]}
                onPress={() =>
                  store.handlePressSubmit(
                    this.props.navigation,
                    this.props.navigation.state.params,
                    this.props.passwordSettingStore,
                    this.props.walletStore,
                    this.props.bannerStore,
                    this.props.settingStore,
                    // this.props.authStore,
                  )
                }
              />
            </View>
            <MnemonicBackupModal parentStore={store} />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default inject(
  'walletCreateStore',
  'walletStore',
  'passwordSettingStore',
  'settingStore',
)(observer(WalletCreatePage));
