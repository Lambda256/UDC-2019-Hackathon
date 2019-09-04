import {action, observable} from 'mobx';
import {persist} from 'mobx-persist';
import WalletService from '../service/WalletService';
import NavigationService from '../../config/nav/NavigationService';

class WalletStore {
  service = WalletService.createWalletService();

  @persist @observable seedPhrase = '';
  @persist @observable network = '';
  @persist @observable address = '';
  @persist @observable keystore = '';
  @persist @observable pubKey = '';
  @persist('list') @observable mnemonicWords = [];
  @observable isReady = false;
  @observable isVisibleBackUpModal = false;
  @observable isRefreshing = false;
  @observable userTokenContractAddress = '';
  @observable assets = [];
  @observable assetData = {
    _btcAddress: '',
    _ethAddress: '',
  };

  @action setAssets = assets => (this.assets = assets);
  @action setAssetData = assetData => (this.assetData = assetData);
  @action setSeedPhrase = seedPhrase => (this.seedPhrase = seedPhrase);
  @action setNetwork = network => (this.network = network);
  @action setAddress = address => (this.address = address);
  @action setKeystore = keystore => (this.keystore = keystore);
  @action setPubKey = pubKey => (this.pubKey = pubKey);
  @action setIsRefreshingTrue = () => (this.isRefreshing = true);
  @action setIsRefreshingFalse = () => (this.isRefreshing = false);
  @action popModal = () => (this.isVisibleBackUpModal = true);
  @action closeBackUpModal = () => (this.isVisibleBackUpModal = false);
  @action handleBackupModalHide = () =>
    NavigationService.navigate('WalletPage');

  @action setInitialStore = async (navigation, userTokenContractAddress) => {
    // this.userTokenContractAddress = userTokenContractAddress;
    await this.service.setWeb3();
    this.navigation = navigation;
    this.setMnemonicWords(this.seedPhrase);
  };

  @action setMnemonicWords = mnemonic => {
    this.mnemonicWords = [...mnemonic.split(' ')];
  };

  @action setMemberWalletAddress = async (auth, ethAddress) => {
    // await setMemberWalletAddress(auth.accessToken, {
    //   username: auth.tokenAdditionalParameters.userName,
    //   walletAddress: ethAddress
    // });
  };

  @action handleRefreshAssets = () => {
    this.setIsRefreshingTrue();
    this.updateBalance();
    this.setIsRefreshingFalse();
  };

  @action updateAddress = () => {
    this.assets.forEach(async (value, index) => {
      if (value.code === 'BITCOIN') {
        // const response = await getBitcoinInfoByNetwork();
        // const data = await response.json();
        // this.assets[index].address = this.assetData._btcAddress;
        // this.assets[index].info = data.data;
      } else {
        this.assets[index].address = this.assetData._ethAddress;
        this.assets[index].info = '';
      }
    });
  };

  @action updateBalance = () => {
    this.assets.forEach(async (value, index) => {
      if (value.code === 'ETHEREUM') {
        this.updateEthereumBalance(index);
      } else {
        this.updateCustomTokenBalance(index);
      }
    });
  };

  @action updateAddressAndBalance = () => {
    this.assets.forEach(async (value, index) => {
      if (value.code === 'ETHEREUM') {
        this.updateAddressByAssetIndex(index, this.assetData._ethAddress);
        this.updateEthereumBalance(index);
      } else {
        this.updateAddressByAssetIndex(index, this.assetData._ethAddress);
        this.updateCustomTokenBalance(index);
      }
    });
  };

  @action updateAddressByAssetIndex = (assetIndex, address, info = '') => {
    this.assets[assetIndex].address = address;
    this.assets[assetIndex].info = info;
  };

  @action updateEthereumBalance = async assetIndex => {
    this.assets[assetIndex].balance = await this.service.getWalletBalance(
      this.assetData._ethAddress,
    );
  };

  @action updateCustomTokenBalance = async assetIndex => {
    await this.service.setContract(this.userTokenContractAddress);
    this.assets[assetIndex].balance = await this.service.getERC20Balance(
      this.userTokenContractAddress,
      this.assetData._ethAddress,
    );
  };

  @action handlePressPasswordSubmit = async (passwordEnterStore, errorView) => {
    await passwordEnterStore.setIsLoadingTrue();
    const isValidatePassword = await this.service.validatePassword(
      passwordEnterStore.passwordInput,
    );
    await passwordEnterStore.setIsLoadingFalse();

    if (isValidatePassword) {
      passwordEnterStore.setErrorMessageHide();
      this.popModal();
    } else {
      passwordEnterStore.setErrorMessageShow();
      errorView.shake(500);
    }
  };

  @action handlePressMnemonicBackup = settingStore => {
    if (settingStore.isWalletPasswordApply) {
      this.navigation.navigate('PasswordEnterPage', {
        handlePress: this.handlePressPasswordSubmit,
      });
    } else {
      this.popModal();
    }
  };
}

export default WalletStore;
