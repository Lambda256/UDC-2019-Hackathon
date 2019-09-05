import WalletStore from './WalletStore';
import BannerStore from './BannerStore';
import WalletImportStore from './WalletImportStore';
import WalletCreateStore from './WalletCreateStore';
import WalletConnectStore from './WalletConnectStore';

export default {
  walletStore: new WalletStore(),
  walletCreateStore: new WalletCreateStore(),
  walletImportStore: new WalletImportStore(),
  walletConnectStore: new WalletConnectStore(),
  bannerStore: new BannerStore(),
};
