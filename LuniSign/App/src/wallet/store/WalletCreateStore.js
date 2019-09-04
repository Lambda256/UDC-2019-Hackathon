import {action, observable} from 'mobx';
// import {InitAssetTypeList} from "../../common/function/InitAssetTypeList";
// import {InitAppPropertyList} from "../../common/function/InitAppPropertyList";
// import {InitCommunityList} from "../../common/function/InitCommunityList";
import WalletService from '../service/WalletService';
import NavigationService from '../../config/nav/NavigationService';
import messageProvider from '../../common/MessageProvider';

class WalletCreateStore {
  service = WalletService.createWalletService();

  @observable mnemonicWords = [];
  @observable isVisibleBackUpModal = false;
  @observable isLoading = false;
  @observable loadingText = messageProvider.wallet.creating_wallet;

  @action setIsLoadingTrue = () => (this.isLoading = true);
  @action setIsLoadingFalse = () => (this.isLoading = false);
  @action setIsVisibleBackUpModalTrue = () =>
    (this.isVisibleBackUpModal = true);

  @action setMnemonicWords = async mnemonic => {
    this.mnemonicWords = [...mnemonic.split(' ')];
  };

  @action readyWallet = async (walletStore, passwordInput = '') => {
    try {
      await this.service.setWeb3();
      await this.service.createNewWallet(walletStore, passwordInput);
    } catch (e) {
      console.log(' === readyWallet error : ', e);
    }
    await this.setMnemonicWords(this.service.mnemonic);
    NavigationService.navigate('MnemonicBackupInitPage', {
      mnemonicWords: this.mnemonicWords,
      handlePress: this.handlePressMnemonicSubmit,
    });
  };

  @action startReadyWallet = async (passwordSettingStore, walletStore) => {
    passwordSettingStore.setIsValidateSubmitFalse();
    this.setIsLoadingTrue();
    await this.readyWallet(walletStore, '');
    this.setIsLoadingFalse();
  };

  @action setAssetData = async (auth, walletStore) => {
    // TODO: not used?
    walletStore.setAssetData({
      _ethAddress: walletStore.address,
      _btcAddress: '',
    });
    await walletStore.setMemberWalletAddress(auth, walletStore.address);
  };

  // @action closeBackUpModal = () => {
  //   this.isVisibleBackUpModal = false;
  //   this.loadingText = messageProvider.wallet.loading_wallet;
  //   this.setIsLoadingTrue();
  // };

  checkPasswordApplied(passwordSettingStore, settingStore) {
    if (passwordSettingStore.isChecked) {
      settingStore.setWalletPasswordApplyTrue();
    }
  }

  @action handlePressMnemonicSubmit = () => {
    NavigationService.navigate('MemberInfoInitPage');
  };

  @action handlePressSubmit = async (
    navigation,
    passwordSettingStore,
    walletStore,
    bannerStore,
    settingStore,
  ) => {
    await this.startReadyWallet(passwordSettingStore, walletStore);
    // this.checkPasswordApplied(passwordSettingStore, settingStore);   //TODO: password not used?
  };

  @action reset = () => {
    this.mnemonicWords = [];
    this.isLoading = false;
    this.isVisibleBackUpModal = false;
    this.loadingText = messageProvider.wallet.creating_wallet;
  };
}

export default WalletCreateStore;
