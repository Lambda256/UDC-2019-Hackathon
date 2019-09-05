import {action, observable} from 'mobx';
import WalletService from '../../wallet/service/WalletService';

class SplashStore {
  service = WalletService.createWalletService();

  @observable splashMessage = 'Splash Store 입니다';

  @action setAssetData = async walletStore => {
    await this.service.loadWallet(
      walletStore.address,
      walletStore.seedPhrase,
      walletStore.keystore,
    );
    await this.service.setWeb3();
  };

  // @action setApiData = async ({
  //   authStore,
  //   settingStore,
  //   walletStore,
  //   bannerStore,
  // }) => {
  //   // await InitAppPropertyList(authStore, settingStore);
  //   // await InitAssetTypeList(authStore, walletStore, settingStore);
  //   // await InitCommunityList(authStore, settingStore);
  //   // await bannerStore.updateBannerInfo(authStore.auth.accessToken);
  // };
}

export default SplashStore;
