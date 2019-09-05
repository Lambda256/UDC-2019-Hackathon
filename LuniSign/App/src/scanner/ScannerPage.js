import React from 'react';
import {withNavigationFocus} from 'react-navigation';
import {Header} from 'react-navigation';
import {View, Alert, Dimensions} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {inject, observer} from 'mobx-react';
import {PulseIndicator} from 'react-native-indicators';
import DefaultColors from '../common/style/DefaultColors';
import messageProvider from '../common/MessageProvider';
import CustomQRMarker from '../common/component/CustomQRMarker';

const {height} = Dimensions.get('window');

const ScannerPage = ({
  walletConnectStore,
  walletStore,
  scannerStore,
  dappStore,
  memberInfoFormStore,
  navigation,
  isFocused,
}) => {
  const onSuccess = async e => {
    try {
      console.log('==== QR 코드 스캔 성공');
      console.log(e.data);

      await walletConnectStore.initWalletConnect(
        e.data,
        navigation,
        walletStore.address,
        dappStore,
        memberInfoFormStore.userInfo,
      );
    } catch (e) {
      Alert.alert(
        messageProvider.asset.qrcode_error,
        messageProvider.common.please_try_again,
      );
      console.log(' === QRCode Scan error: ', e);
    }
  };

  const _renderIndicator = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <PulseIndicator color={'#fff'} size={80} />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {isFocused && (
        <QRCodeScanner
          showMarker
          fadeIn={true}
          onRead={onSuccess}
          reactivate={true}
          reactivateTimeout={1000}
          cameraStyle={{height: height - Header.HEIGHT}}
          cameraProps={{captureAudio: false}}
          customMarker={
            <CustomQRMarker
              width={250}
              height={250}
              borderColor={DefaultColors.mainColor}
              borderWidth={5}
            />
          }
        />
      )}
      {!scannerStore.isAuthorized && _renderIndicator()}
    </View>
  );
};

export default withNavigationFocus(
  inject(
    'walletConnectStore',
    'walletStore',
    'scannerStore',
    'dappStore',
    'memberInfoFormStore',
  )(observer(ScannerPage)),
);
