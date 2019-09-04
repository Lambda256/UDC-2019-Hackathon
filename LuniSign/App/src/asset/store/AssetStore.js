import {action, observable} from 'mobx';
import mockData from '../../MockData';
import {getBalanceFromAPI} from '../../dapp/repository/DAppRepository';

class AssetStore {
  @observable assetList = [];
  @observable isRefreshing = false;

  @action setIsRefreshingTrue = () => {
    this.isRefreshing = true;
  };
  @action setIsRefreshingFalse = () => {
    this.isRefreshing = false;
  };

  @action handleRefreshing = async address => {
    await this.updateBalanceByAddress(address);
    console.log('balance updated');
    this.setIsRefreshingFalse();
  };

  @action updateAssetByAddress = async address => {
    for (let i = 0; i < mockData.asset.length; i++) {
      const response = await getBalanceFromAPI(
        address,
        mockData.asset[i].mtSymbol,
        mockData.asset[i].stSymbol,
      );
      const result = await response.json();

      if (result.result) {
        mockData.asset[i].balance = result.data.balance;
      }
      this.assetList.push(mockData.asset[i]);
    }
  };

  @action updateBalanceByAddress = async address => {
    for (let i = 0; i < mockData.asset.length; i++) {
      const response = await getBalanceFromAPI(
        address,
        mockData.asset[i].mtSymbol,
        mockData.asset[i].stSymbol,
      );
      const result = await response.json();

      if (result.result) {
        this.assetList[i].balance = result.data.balance;
      }
    }
  };
}

export default AssetStore;
