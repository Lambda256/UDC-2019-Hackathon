import {action, observable} from 'mobx';
// import {InitAssetTypeList} from "../../common/function/InitAssetTypeList";
// import {InitAppPropertyList} from "../../common/function/InitAppPropertyList";
// import {InitCommunityList} from "../../common/function/InitCommunityList";
import NavigationService from '../../config/nav/NavigationService';
import messageProvider from '../../common/MessageProvider';
import WalletService from '../service/WalletService';

class WalletImportStore {
  service = WalletService.createWalletService();

  @observable mnemonicInput = '';
  @observable isLoading = false;
  @observable loadingText = messageProvider.wallet.importing_wallet;
  @observable isVisibleMnemonicWarningModal = false;
  @observable warningText = messageProvider.wallet.default_mnemonic_warning;
  @observable mnemonicWarningText =
    messageProvider.wallet.checksum_invalid_mnemonic_warning;

  @action setIsLoadingTrue = async () => (this.isLoading = true);
  @action setIsLoadingFalse = () => (this.isLoading = false);
  @action handleChangeMnemonic = input => (this.mnemonicInput = input);
  @action toggleMnemonicWarningModal = () =>
    (this.isVisibleMnemonicWarningModal = !this.isVisibleMnemonicWarningModal);

  @action handlePressSubmitMnemonic = async navigation => {
    const isValidMnemonic = this.service.validateMnemonic(this.mnemonicInput);
    const {navigate} = navigation;

    if (!isValidMnemonic) {
      this.setMnemonicWarning('ChecksumFail');
      this.isVisibleMnemonicWarningModal = true;
    } else {
      await this.service.setMnemonic(this.mnemonicInput);
      navigate({
        routeName: 'WalletImportSetPasswordPage',
        params: navigation.state.params,
      });
    }
  };

  @action readyWallet = async (walletStore, passwordInput = '') => {
    try {
      await this.service.setWeb3();
      await this.service.restoreWallet(
        walletStore,
        this.mnemonicInput,
        passwordInput,
      );
    } catch (e) {
      console.log(' === readyWallet error : ', e);
    }
  };

  @action startReadyWallet = async (walletStore, passwordStore) => {
    passwordStore.setIsValidateSubmitFalse();
    await this.setIsLoadingTrue();
    await this.readyWallet(walletStore, passwordStore.passwordInput);
    this.setIsLoadingFalse();
  };

  @action setData = async (
    auth,
    authStore,
    walletStore,
    settingStore,
    bannerStore,
  ) => {
    // await authStore.setAuthData(auth);
    // await this.setApiData(authStore, walletStore, settingStore, bannerStore);
    // await this.setAssetData(auth, walletStore);
  };

  @action setAssetData = async (auth, walletStore) => {
    // const assetData = {
    //   _ethAddress: walletStore.address,
    //   _btcAddress: ''
    // };
    // walletStore.setAssetData(assetData);
    // walletStore.setMemberWalletAddress(auth, walletStore.address);
  };

  @action setApiData = async (
    authStore,
    walletStore,
    settingStore,
    bannerStore,
  ) => {
    // await InitAssetTypeList(authStore, walletStore, settingStore);
    // await InitAppPropertyList(authStore, settingStore);
    // await InitCommunityList(authStore, settingStore);
    // await bannerStore.updateBannerInfo(authStore.auth.accessToken);
  };

  @action checkPasswordApplied = (passwordStore, settingStore) => {
    if (passwordStore.isChecked) {
      settingStore.setWalletPasswordApplyTrue();
    }
  };

  @action setMnemonicWarning = invalidMessage => {
    switch (invalidMessage) {
      case 'InvalidLengthFail':
        this.mnemonicWarningText =
          messageProvider.wallet.length_invalid_mnemonic_warning;
        break;
      case 'BadWordFail':
        this.mnemonicWarningText =
          messageProvider.wallet.badword_invalid_mnemonic_warning;
        break;
      case 'ChecksumFail':
        this.mnemonicWarningText =
          messageProvider.wallet.checksum_invalid_mnemonic_warning;
        break;
    }
  };

  @action handlePressSubmitImport = async (
    auth,
    settingStore,
    passwordStore,
    walletStore,
    bannerStore,
    authStore,
  ) => {
    await this.startReadyWallet(walletStore, passwordStore);
    await this.setData(auth, walletStore, settingStore, bannerStore);
    this.checkPasswordApplied(passwordStore, settingStore);
    NavigationService.navigate('MainBottomTabNavigator');
  };

  @action reset = () => {
    this.isLoading = false;
    this.isVisibleMnemonicWarningModal = false;
    this.loadingText = messageProvider.wallet.importing_wallet;
    this.warningText = messageProvider.wallet.default_mnemonic_warning;
    this.mnemonicWarningText =
      messageProvider.wallet.checksum_invalid_mnemonic_warning;
  };
}

export default WalletImportStore;
