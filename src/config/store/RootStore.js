import {create} from 'mobx-persist';
import AsyncStorage from '@react-native-community/async-storage';

import SplashStore from '../../splash/store/SplashStore';
import walletStores from '../../wallet/store';
import commonStores from '../../common/store';
import settingStores from '../../setting/store';
import scannerStores from '../../scanner/store';
import memberStores from '../../user/store';
import assetStores from '../../asset/store';
import dappStores from '../../dapp/store';

const splashStore = new SplashStore();

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

// hydrate('settingStore', settingStore);
hydrate('walletStore', walletStores.walletStore).then(() =>
  console.log('walletStore has been hydrated'),
);

export default {
  splashStore,
  ...walletStores,
  ...commonStores,
  ...settingStores,
  ...assetStores,
  ...scannerStores,
  ...memberStores,
  ...dappStores,
};
