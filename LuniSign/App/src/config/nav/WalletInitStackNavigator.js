import {createStackNavigator} from 'react-navigation';
import WalletInitPage from '../../wallet/WalletInitPage';
import WalletCreatePage from '../../wallet/WalletCreatePage';
import WalletImportPage from '../../wallet/WalletImportPage';
import WalletImportSetPasswordPage from '../../wallet/WalletImportSetPasswordPage';
import MnemonicBackupPage from '../../wallet/MnemonicBackupPage';
import RemoveHeaderShadow from '../../common/style/RemoveHeaderShadow';

MnemonicBackupPage.navigationOptions = () => ({
  gesturesEnabled: false,
  headerLeft: null,
  headerTitle: '지갑 백업',
  headerStyle: RemoveHeaderShadow,
});

const WalletInitStackNavigator = createStackNavigator(
  {
    WalletInitPage: WalletInitPage,
    WalletCreatePage: WalletCreatePage,
    WalletImportPage: WalletImportPage,
    WalletImportSetPasswordPage: WalletImportSetPasswordPage,
  },
  {
    initialRouteName: 'WalletInitPage',
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
  },
);

export default WalletInitStackNavigator;
