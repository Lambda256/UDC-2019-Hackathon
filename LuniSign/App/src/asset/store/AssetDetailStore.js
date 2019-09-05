import {action, observable} from 'mobx';
import {
  getEthereumTransactionsByAddress,
  getEtherscanAddressUrl,
  getEtherscanTxUrl,
} from '../repository/EthereumAssetRepository';
import {NumberWithCommas, WeiConverter} from '../../common/function/NumberUtil';
import {getTransactionERC20ByAddress} from '../repository/CustomerAssetRepository';
import {persist} from 'mobx-persist';
import openBrowser from '../../common/function/LinkUtil';

class AssetDetailStore {
  MAX_TRANSACTION_ARRAY_LENGTH = 20;

  @persist('list') @observable ethereumPendingTransactions = [];
  @persist('list') @observable userTokenPendingTransactions = [];
  @observable isLoading = false;
  @observable isRefreshing = false;
  @observable isVisibleTransactionModal = false;
  @observable userTokenContractAddress = '';
  @observable assetInfo = {};
  @observable transactions = [];
  @observable transactionModal = {
    txid: '',
    isSend: false,
    amount: '',
    timstamp: '',
    toAddress: '',
    fromAddress: '',
    timestamp: '',
    fee: '',
    inputSum: '',
    outputSum: '',
  };
  @observable sendTransactionModalOption = {
    iconName: 'menu-up',
    transactionOperator: '-',
    transactionColor: '#6B7EBF',
  };
  @observable receiveTransactionModalOption = {
    iconName: 'menu-down',
    transactionOperator: '+',
    transactionColor: '#65BF77',
  };

  @action setIsLoadingTrue = () => (this.isLoading = true);
  @action setIsLoadingFalse = () => (this.isLoading = false);
  @action setIsRefreshingTrue = () => (this.isRefreshing = true);
  @action setIsRefresingFalse = () => (this.isRefreshing = false);

  @action popModal = () => (this.isVisibleTransactionModal = true);
  @action closeModal = () => (this.isVisibleTransactionModal = false);

  @action pushEthereumPendingTransaction = transaction =>
    this.ethereumPendingTransactions.push(transaction);
  @action pushUserTokenPendingTransaction = transaction =>
    this.userTokenPendingTransactions.push(transaction);

  @action searchEtherscanTransaction = () =>
    openBrowser(getEtherscanTxUrl() + '/' + this.transactionModal.txid);
  @action searchEtherscanAddress = async () =>
    openBrowser(getEtherscanAddressUrl() + '/' + this.assetInfo.address);

  @action setInitialStore = async (assetInfo, userTokenContractAddress) => {
    this.assetInfo = assetInfo;
    this.userTokenContractAddress = userTokenContractAddress;
  };

  @action setEthereumTransactionModal = ({
    txid,
    isSend,
    isPending,
    amount,
    toAddress,
    fromAddress,
    timestamp,
    fee,
    info,
  }) => {
    this.transactionModal = {
      txid: txid,
      isSend: isSend,
      isPending: isPending,
      amount: NumberWithCommas(amount, 0),
      toAddress: toAddress,
      fromAddress: fromAddress,
      timestamp: timestamp,
      fee: isPending
        ? fee.toString()
        : this.getEtherTransactionFee(info.gasPrice, info.gasUsed),
    };
  };

  @action handleRefresh = walletStore => {
    this.setIsRefreshingTrue();
    walletStore.updateAddress();
    this.updateTransactions();
    this.setIsRefresingFalse();
  };

  @action popEthereumTransactionModal = txid => {
    this.setEthereumTransactionModal(
      this.transactions.find(t => t.txid === txid),
    );
    this.popModal();
  };

  @action updateTransactions = () => {
    const currentAssetAddress = this.assetInfo.address;
    return new Promise(async resolve => {
      if (this.assetInfo.code === 'ETHEREUM') {
        await this.updateEthereumTransactions(currentAssetAddress);
      } else {
        await this.updateCustomTokenTransactions(
          currentAssetAddress,
          this.userTokenContractAddress,
        );
      }
      resolve();
    });
  };

  @action updateEthereumTransactions = async address => {
    const response = await getEthereumTransactionsByAddress(address);
    const {result} = await response.json();
    const tempTansactions = [];

    result.slice(0, this.MAX_TRANSACTION_ARRAY_LENGTH).map(value => {
      this.checkPendingTransaction('ethereumPendingTransactions', value.hash);
      tempTansactions.push(this.makeEthereumTransaction(value, address));
    });

    this.transactions = [
      ...this.ethereumPendingTransactions,
      ...tempTansactions,
    ];
  };

  @action updateCustomTokenTransactions = async (
    address,
    userTokenContractAddress,
  ) => {
    const response = await getTransactionERC20ByAddress(
      address,
      userTokenContractAddress,
    );
    const {result} = await response.json();
    const tempTansactions = [];

    result.slice(0, this.MAX_TRANSACTION_ARRAY_LENGTH).map(value => {
      this.checkPendingTransaction('userTokenPendingTransactions', value.hash);
      tempTansactions.push(this.makeEthereumTransaction(value, address));
    });

    this.transactions = [
      ...this.userTokenPendingTransactions,
      ...tempTansactions,
    ];
  };

  @action checkPendingTransaction = (transactionArrayName, hash) => {
    let sameTxidIndex = -1;

    if (this[transactionArrayName].length > 0) {
      sameTxidIndex = this[transactionArrayName].findIndex(
        transaction => transaction.txid === hash,
      );

      if (sameTxidIndex > -1) {
        this[transactionArrayName].splice(sameTxidIndex, 1);
      }
    }
  };

  @action makeEthereumTransaction = (value, currentAddress) => ({
    isSend: value.from.toLowerCase() === currentAddress.toLowerCase(),
    txid: value.hash,
    timestamp: value.timeStamp,
    toAddress: value.to,
    fromAddress: value.from,
    amount: WeiConverter(value.value),
    info: value,
    fromMore: 0,
  });

  getEtherTransactionFee = (gasPrice, gasUsed) => {
    //console.log("계산된 가스비(ETH): ", gasPrice * gasUsed / 1000000000);    // 10^-18
    //console.log("gas(gwei)", gasPrice / 1000000000 );
    //console.log("gas(gwei) * gasUsed = fee(gwei)", gasPrice / 1000000000 * gasUsed );
    //console.log("fee(gwei) * 10^-9 = fee(ether)  )", gasPrice * gasUsed / 1000000000000000000);
    return (gasPrice * gasUsed) / 1000000000000000000;
  };

  @action reset = () => {
    this.isLoading = false;
    this.isRefreshing = false;
    this.isVisibleTransactionModal = false;
    this.userTokenContractAddress = '';
    this.assetInfo = {};
    this.transactions = [];
    this.transactionModal = {
      txid: '',
      isSend: false,
      amount: '',
      timstamp: '',
      toAddress: '',
      fromAddress: '',
      timestamp: '',
      fee: '',
      inputSum: '',
      outputSum: '',
    };
  };
}

export default AssetDetailStore;
