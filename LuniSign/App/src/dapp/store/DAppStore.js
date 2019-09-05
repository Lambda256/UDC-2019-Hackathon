import {action, observable} from 'mobx';
import {persist} from 'mobx-persist';
import {
  getUsedDappByIdFromContract,
  getUsedDappIdsFromContract,
} from '../repository/DAppRepository';

class DAppStore {
  @observable @persist('list') dappList = [];
  @observable isRefreshing = false;

  @action setIsRefreshingTrue = () => {
    this.isRefreshing = true;
  };
  @action setIsRefreshingFalse = () => {
    this.isRefreshing = false;
  };

  @action handleRefreshing = async () => {
    await this.getUsedDappListByAddress();
    this.setIsRefreshingFalse();
  };

  @action stringSplitToArray = str => {
    return str.split(' ');
  };

  @action pushDapp = dapp => this.dappList.push(dapp);

  @action toggleIsProvided = index => {
    this.dappList[index].isProvided = !this.dappList[index].isProvided;
  };

  @action getUsedDappListByAddress = async address => {
    try {
      // Get DApp List By Id
      const response = await getUsedDappIdsFromContract({from: address});
      const result = await response.json();

      if (result.result) {
        const dappIds = result.data.res[0];

        for (let i = 0; i < dappIds.length; i++) {
          const dappResponse = await getUsedDappByIdFromContract({
            from: address,
            inputs: {
              dappId: dappIds[i],
            },
          });
          const dappResult = await dappResponse.json();

          if (dappResult.result) {
            this.pushDAppFromContract(dappResult.data.res);
          }
        }
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  @action pushDAppFromContract = dappInfo => {
    const dappObject = {
      dappId: dappInfo[0],
      publicKey: dappInfo[1],
      name: dappInfo[2],
      description: dappInfo[3],
      icons: this.stringSplitToArray(dappInfo[4]),
      url: dappInfo[5],
      isProvided: dappInfo[6],
    };
    console.log(dappObject);
    this.dappList.push(dappObject);
  };

  @action convertDAppObjectList = rawList => {
    const tempDAppList = [];

    for (let i = 0; i < rawList[0].length; i++) {
      // const dapp = {
      //   publicKey: rawList.publicKey[i],
      //   name: rawList.name[i],
      //   description: rawList.description[i],
      //   icons: rawList.icons[i],
      //   url: rawList.url[i],
      //   isProvided: rawList.isProvided[i]
      // };
      // tempDAppList.push(dapp);
      console.log(rawList[i]);
    }

    this.dappList = tempDAppList;
  };

  @action updateDAppList = rawList => {
    console.log(rawList);
  };
}

export default DAppStore;
