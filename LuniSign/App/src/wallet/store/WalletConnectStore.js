import {action, observable, computed} from 'mobx';
import RNWalletConnect from '@walletconnect/react-native';
import Globals from '../../config/Globals';
import {dappIconsToString} from '../../common/function/CryptoUtil';
import {encryptWithPublicKey, signing} from '../service/EthersService';
import {
  getUsedDappFromContract,
  registerIVToContract,
  registerUseDappToContract,
  updateDappProvidingToContract,
} from '../../dapp/repository/DAppRepository';

class WalletConnectStore {
  walletConnector;
  navigation;
  dappStore;

  @observable address = '';
  @observable requestMessage = '';
  @observable modalType = '';
  @observable isConnected = false;
  @observable isVisibleRequestModal = false;
  @observable isModalCompleteRequest = false;
  @observable isDappRequestUserApprove = false;
  @observable sessionPeerMeta = {};
  @observable currentPayload = {};
  @observable currentDAppObject = {};
  @observable rawTxArray = [];

  @action updateRequestMessage = msg => (this.requestMessage = msg);
  @action updateModalType = type => (this.modalType = type);
  @action toggleIsVisibleRequestModal = () =>
    (this.isVisibleRequestModal = !this.isVisibleRequestModal);
  @action setIsModalCompleteRequest = bool => {
    this.isModalCompleteRequest = bool;
  };
  @action setIsDappRequestUserApprove = bool => {
    this.isDappRequestUserApprove = bool;
  };

  @computed get representationIcon() {
    let iconUrl = '';

    if (this.sessionPeerMeta.icons) {
      this.sessionPeerMeta.icons
        .slice()
        .reverse()
        .map(icon => {
          const formatIndex = icon.lastIndexOf('.');
          const format = icon.slice(formatIndex + 1);
          if (format === 'png') {
            iconUrl = icon;
          }
        });
    }

    return iconUrl;
  }

  @action initWalletConnect = async (
    uri,
    navigation,
    address,
    dappStore,
    userInfo,
  ) => {
    this.navigation = navigation;
    this.address = address;
    this.dappStore = dappStore;
    this.userInfo = userInfo;
    this.walletConnector = await new RNWalletConnect(
      {
        uri: uri,
      },
      {
        clientMeta: {
          description: '',
          icons: ['https://example.walletconnect.org/favicon.ico'],
          name: 'WalletConnect Example',
          url: 'https://example.walletconnect.org',
          ssl: true,
        },
      },
    );
    this.navigation.navigate('ConnectingPage');
    this.subscribeWalletConnect();
  };

  @action subscribeWalletConnect = () => {
    this.walletConnector.on('session_request', (error, payload) => {
      if (error) {
        throw error;
      }
      const {peerMeta} = payload.params[0];
      this.sessionPeerMeta = peerMeta;
      console.log('==== On Session Request', payload);
      this.approveSessionRequest();
    });

    this.walletConnector.on('call_request', (error, payload) => {
      if (error) {
        throw error;
      }

      this.handleCallRequest(payload);
    });

    this.walletConnector.on('disconnect', async (error, payload) => {
      if (error) {
        throw error;
      }
      await this.handleComponentWillUnmount();
      delete this.walletConnector;
      this.navigation.navigate('DAppPage');
    });
  };

  @action approveSessionRequest = () => {
    this.walletConnector.approveSession({
      accounts: [this.address],
      chainId: Globals.__LuniSign_DEV__ ? 3 : 1,
    });
    this.isConnected = true;
    console.log('=== 세션 요청 승인');
  };

  @action approveCallRequest = (id, result) => {
    this.walletConnector.approveRequest({
      id: id,
      result: result,
    });
  };

  @action getCurrentDAppInfo = publicKey => ({
    publicKey: publicKey,
    name: this.sessionPeerMeta.name,
    description: this.sessionPeerMeta.description,
    icons: dappIconsToString([
      'https://cdn.luniverse.io/bonjour/favicon/favicon-32x32.png',
      'https://cdn.luniverse.io/bonjour/favicon/favicon-32x32.png',
    ]),
    url: this.sessionPeerMeta.url,
    isProvided: false,
  });

  @action handleCallRequest = payload => {
    if (payload.method === 'eth_signTransaction') {
      this.popCurrentModal('purchase', '구매하시겠습니까?', payload);
    } else if (payload.method === 'luni_set_owner') {
      this.signToRawTx(payload, payload.params.rawTx);
    } else if (payload.method === 'luni_login') {
      this.handleRegisterDAppRequest(payload);
    } else if (payload.method === 'luni_areyou') {
      this.popCurrentModal('areYou', '인증을 진행하시겠습니까?', payload);
    }
  };

  @action handleModalApproveEvent = () => {
    if (this.modalType === 'provideUserInfo') {
      this.handleProvideUserInfo().then(r =>
        console.log('provideUserInfo result', r),
      );
    } else if (this.modalType === 'purchase') {
      this.signToRawTx(this.currentPayload, this.currentPayload.params[0]).then(
        r => console.log('purchase result', r),
      );
    } else if (this.modalType === 'areYou') {
      this.handleAreYouRequest(this.currentPayload).then(r =>
        console.log('luni_areyou result', r),
      );
    }
  };

  @action popCurrentModal = (type, msg, payload = {}) => {
    this.updateModalType(type);
    this.updateRequestMessage(msg);
    this.toggleIsVisibleRequestModal();
    this.setIsModalCompleteRequest(false);
    this.currentPayload = payload;
    // console.log('currentPayload', this.currentPayload);
  };

  @action closeModal = () => {
    setTimeout(() => {
      this.toggleIsVisibleRequestModal();
      this.updateModalType('');
      this.updateRequestMessage('');
    }, 2000);
  };

  @action handleApproveProvidingUserInfo = () => {
    this.popCurrentModal(
      'provideUserInfo',
      `${this.sessionPeerMeta.name}에 개인정보를 제공하시겠습니까?`,
    );
  };

  @action signToRawTx = async (payload, rawTx) => {
    this.saveRawTx(rawTx);
    try {
      delete rawTx.from;
      const signedTx = await signing(rawTx);
      // const signedTx = await signingEthereumTx(rawTx);
      // console.log('signToRawTx 1', payload);
      // console.log('signToRawTx 2', rawTx);
      // const signedTx = await signingEthereumjsTx(rawTx);
      // console.log('signedTx 3', signedTx);
      this.approveCallRequest(payload.id, signedTx);
      this.setIsModalCompleteRequest(true);
      this.updateRequestMessage(
        payload.method === 'luni_set_owner'
          ? '구매가 확정되었습니다 😊'
          : '승인이 완료되었습니다 !',
      );
      // this.closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  @action handleClickCancel = () => {
    // this.walletConnector.rejectSession();
    // this.navigation.navigate('ScannerPage');
    // console.log('=== 세션 요청 거절');
    // this.setIsRequestApproveInfoFalse();
    this.updateRequestMessage('');
  };

  // 구 handlepressapprove
  @action handleProvideUserInfo = async () => {
    const publicKey = this.currentDAppObject.publicKey;
    const userInfoString = JSON.stringify(this.userInfo);
    const encrypted = await encryptWithPublicKey(publicKey, userInfoString);
    const params = {
      from: this.address,
      inputs: {
        publicKey: this.currentDAppObject.publicKey,
        userAddress: this.address,
        isProvided: true,
        ...encrypted,
      },
    };
    const response = await updateDappProvidingToContract(params);
    const result = await response.json();

    if (result.result) {
      delete result.data.rawTx.from;
      const signedTx = await signing(result.data.rawTx);
      const txResponse = await updateDappProvidingToContract({
        signedTx: signedTx,
      });
      const txResult = await txResponse.json();

      if (txResult.result) {
        // this.setIsRequestApproveInfoFalse();
        this.dappStore.toggleIsProvided(
          this.dappStore.dappList.findIndex(
            i => i.publicKey === this.currentDAppObject.publicKey,
          ),
        );

        this.setIsDappRequestUserApprove(false);
        this.setIsModalCompleteRequest(true);
        this.updateRequestMessage(
          `${this.sessionPeerMeta.name}에 개인 정보가 제공되었습니다 !`,
        );
        this.closeModal();
        return true;
      }
    }
    return false;
  };

  // FIXME: 등록에 실패했을 경우 재요청을 요청해야 함
  @action handleRegisterDAppRequest = async payload => {
    // FIXME: 이미 등록된 디앱인지 검사하지 않음
    try {
      const dappPublicKey = payload.params.publicKeyForDapp;
      const dappResponse = await getUsedDappFromContract({
        from: this.address,
        inputs: {
          pubKey: dappPublicKey,
        },
      });
      const dappResult = await dappResponse.json();
      this.currentDAppObject = this.getCurrentDAppInfo(dappPublicKey);

      if (dappResult.data.res[0] === '') {
        const response = await registerUseDappToContract({
          from: this.address,
          inputs: this.currentDAppObject,
        });
        const result = await response.json();

        if (result.result) {
          delete result.data.rawTx.from;
          const signedTx = await signing(result.data.rawTx);
          const txResponse = await registerUseDappToContract({
            signedTx: signedTx,
          });
          const txResult = await txResponse.json();
          this.setIsDappRequestUserApprove(true);

          if (txResult) {
            this.dappStore.pushDapp({
              ...this.currentDAppObject,
              icons: [
                'https://cdn.luniverse.io/bonjour/favicon/favicon-32x32.png',
                'https://cdn.luniverse.io/bonjour/favicon/favicon-32x32.png',
              ],
            });
          }
          return txResult && true;

          // FIXME: DAPP이 잘 등록되었는지 확인하는건데 딜레이가 필요한 듯..?
        }
      } else {
        this.setIsDappRequestUserApprove(!dappResult.data.res[5]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  @action handleAreYouRequest = async payload => {
    try {
      const {randomStr} = payload.params;
      const response = await registerIVToContract({
        from: this.address,
        inputs: {
          randomStr: randomStr,
        },
      });
      const result = await response.json();

      if (result.result) {
        delete result.data.rawTx.from;
        const signedTx = await signing(result.data.rawTx);
        const txResponse = await registerIVToContract({
          signedTx: signedTx,
        });
        const txResult = await txResponse.json();
        console.log(txResult);

        if (txResult.result) {
          this.approveCallRequest(payload.id, txResult.data.txHash);
          this.setIsModalCompleteRequest(true);
          this.updateRequestMessage('인증이 완료되었습니다');
          this.closeModal();
          return true;
        }
      }
      return false;
    } catch (e) {
      console.error(e);
    }
  };

  @action saveRawTx = rawTx => {
    this.rawTxArray.push(rawTx);
    console.log('=== transaction pushed', this.rawTxArray);
  };

  @action handleComponentWillUnmount = () => {
    return new Promise(resolve => {
      this.reset();
      resolve(this.walletConnector.killSession());
    });
  };

  @action reset = () => {
    this.address = '';
    this.requestMessage = '';
    this.isConnected = false;
    this.isVisibleRequestModal = false;
    this.sessionPeerMeta = {};
  };
}

export default WalletConnectStore;
