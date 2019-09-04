import {trimBlankSpace} from '../../common/function/StringUtil';
import {action, computed, observable} from 'mobx';
import {persist} from 'mobx-persist';
import WalletService from '../../wallet/service/WalletService';
import {slicePrefix} from '../../common/function/CryptoUtil';
import messageProvider from '../../common/MessageProvider';
import NavigationService from '../../config/nav/NavigationService';
import {
  registerUserToContract,
  rewardTokenFromContract,
} from '../../dapp/repository/DAppRepository';
import {
  createWallet,
  encryptWithPublicKey,
  signing,
} from '../../wallet/service/EthersService';

class MemberInfoFormStore {
  service = WalletService.createWalletService();

  @observable @persist('object') userInfo = {};
  @observable mnemonicWords = [];
  @observable nameBefore = '';
  @observable nameInput = '';
  @observable emailBefore = '';
  @observable emailInput = '';
  @observable mobileBefore = '';
  @observable mobileInput = '';
  @observable yearBefore = '';
  @observable yearInput = '';
  @observable monthBefore = '';
  @observable monthInput = '';
  @observable dayBefore = '';
  @observable dayInput = '';
  @observable isLoading = false;
  @observable isNameFocused = false;
  @observable isYearFocused = false;
  @observable isMonthFocused = false;
  @observable isDayFocused = false;
  @observable isEmailFocused = false;
  @observable isMobileFocused = false;
  @observable isVisibleBackUpModal = false;
  @observable loadingText = messageProvider.wallet.creating_wallet;
  @observable defaultBorderStyle = {
    borderColor: '#d6d6d6',
    borderBottomWidth: 1.5,
  };
  @observable focusBorderStyle = {
    borderColor: '#7EA7E5',
    borderBottomWidth: 1.5,
  };

  @action setUserInfo = value => (this.userInfo = value);
  @action setIsLoadingTrue = () => (this.isLoading = true);
  @action setIsLoadingFalse = () => (this.isLoading = false);
  @action handleChangeName = value => (this.nameInput = trimBlankSpace(value));
  @action handleChangeYear = value => (this.yearInput = trimBlankSpace(value));
  @action handleChangeDay = value => (this.dayInput = trimBlankSpace(value));
  @action handleChangeMonth = value =>
    (this.monthInput = trimBlankSpace(value));
  @action handleChangeEmail = value =>
    (this.emailInput = trimBlankSpace(value));
  @action handleChangeMobile = value =>
    (this.mobileInput = trimBlankSpace(value));
  @action setIsVisibleBackUpModalTrue = () =>
    (this.isVisibleBackUpModal = true);
  @action setMnemonicWords = async mnemonic => {
    this.mnemonicWords = [...mnemonic.split(' ')];
  };
  @action handleBackupModalHide = () =>
    NavigationService.navigate('MainBottomTabNavigator');

  @action handleFocusName = () => (this.isNameFocused = true);
  @action handleBlurName = () => (this.isNameFocused = false);
  @action handleFocusYear = () => (this.isYearFocused = true);
  @action handleBlurYear = () => (this.isYearFocused = false);
  @action handleFocusMonth = () => (this.isMonthFocused = true);
  @action handleBlurMonth = () => (this.isMonthFocused = false);
  @action handleFocusDay = () => (this.isDayFocused = true);
  @action handleBlurDay = () => (this.isDayFocused = false);
  @action handleFocusEmail = () => (this.isEmailFocused = true);
  @action handleBlurEmail = () => (this.isEmailFocused = false);
  @action handleFocusMobile = () => (this.isMobileFocused = true);
  @action handleBlurMobile = () => (this.isMobileFocused = false);

  @action setFormInfo = ({
    name = '',
    email = '',
    mobile = '',
    dateBirth = '',
  }) => {
    this.nameBefore = name;
    this.nameInput = name;
    this.emailBefore = email;
    this.emailInput = email;
    this.mobileBefore = mobile;
    this.mobileInput = mobile;
    this.yearBefore = dateBirth.substring(0, 4);
    this.yearInput = dateBirth.substring(0, 4);
    this.monthBefore = dateBirth.substring(4, 6);
    this.monthInput = dateBirth.substring(4, 6);
    this.dayBefore = dateBirth.substring(6);
    this.dayInput = dateBirth.substring(6);
  };

  @computed get dateBirth() {
    return `${this.yearInput}${this.monthInput}${this.dayInput}`;
  }

  @computed get isChanged() {
    return (
      this.nameBefore !== this.nameInput ||
      this.emailBefore !== this.emailInput ||
      this.mobileBefore !== this.mobileInput ||
      this.yearBefore !== this.yearInput ||
      this.monthBefore !== this.monthInput ||
      this.dayBefore !== this.dayInput
    );
  }

  @action closeBackUpModal = () => {
    this.isVisibleBackUpModal = false;
    this.loadingText = messageProvider.wallet.loading_wallet;
  };

  // TODO: 인증 완료된 것으로 가정됨
  @action currentUserInfo = () => {
    return {
      name: this.nameInput,
      email: this.emailInput,
      emailCrtfd: true,
      mobile: this.mobileInput,
      mobileCrtfd: true,
      dateBirth: this.dateBirth,
    };
  };

  @action registerUser = async postData => {
    const response = await registerUserToContract(postData);
    const result = await response.json();
    if (result.result) {
      delete result.data.rawTx.from;
      const signedTx = await signing(result.data.rawTx);
      const txResponse = await registerUserToContract({signedTx: signedTx});
      const txResult = await txResponse.json();
      return txResult && true;
    }
    return false;
  };

  @action setWalletInfo = async (
    walletStore,
    jsonWallet,
    {mnemonic, address, publicKey},
  ) => {
    walletStore.setKeystore(jsonWallet);
    walletStore.setSeedPhrase(mnemonic);
    walletStore.setAddress(address);
    walletStore.setPubKey(publicKey);
    await this.setMnemonicWords(mnemonic);
  };

  @action rewardTokenToSignedUser = async address => {
    const params = {
      inputs: {
        receiverAddress: address,
        valueAmount: '10000000000000000000000',
      },
    };
    const response = await rewardTokenFromContract(params);
    console.log('response ', response);
    const result = await response.json();
    console.log('result ', result);
  };

  @action
  handlePressRegisterUser = async (walletStore, memberInfoFormStore) => {
    try {
      const {walletKey, jsonWallet} = await createWallet();
      const publicKey = slicePrefix(walletKey.publicKey);
      const userInfoString = JSON.stringify(this.currentUserInfo());
      const encrypted = await encryptWithPublicKey(publicKey, userInfoString);
      const result = await this.registerUser({
        from: walletKey.address,
        inputs: encrypted,
      });

      console.log('result : ', result);
      if (result) {
        await this.setWalletInfo(walletStore, jsonWallet, walletKey);
        await this.rewardTokenToSignedUser(walletKey.address);
        memberInfoFormStore.setUserInfo(this.currentUserInfo());
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
    }
  };
}

export default MemberInfoFormStore;
