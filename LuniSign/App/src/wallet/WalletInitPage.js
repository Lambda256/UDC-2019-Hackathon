import React from 'react';
import {Image, View, SafeAreaView} from 'react-native';
import {Button} from 'react-native-elements';
import styles from './style/WalletInitPage.style';
import images from './image/images';
import messageProvider from '../common/MessageProvider';
import {inject, observer} from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';
import {BallIndicator} from 'react-native-indicators';
import DefaultColors from '../common/style/DefaultColors';

class WalletInitPage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {navigate} = this.props.navigation;
    const store = this.props.walletCreateStore;
    return (
      <SafeAreaView style={{flex: 1}}>
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
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Image source={images.initLogo} style={styles.logoImage} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              type="clear"
              buttonStyle={styles.createButton}
              titleStyle={styles.createButtonTitle}
              title={messageProvider.wallet.create_wallet}
              onPress={() =>
                store.handlePressSubmit(
                  this.props.navigation,
                  this.props.passwordSettingStore,
                  this.props.walletStore,
                  this.props.bannerStore,
                  this.props.settingStore,
                )
              }
            />
            <Button
              type="outline"
              containerStyle={{marginTop: 20}}
              buttonStyle={[styles.importButton]}
              titleStyle={styles.importButtonTitle}
              title={messageProvider.wallet.import_wallet}
              onPress={() =>
                navigate({
                  routeName: 'WalletImportPage',
                  // params: this.props.navigation.state.params.authData
                })
              }
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default inject(
  'walletCreateStore',
  'walletStore',
  'passwordSettingStore',
  'settingStore',
  'bannerStore',
)(observer(WalletInitPage));
