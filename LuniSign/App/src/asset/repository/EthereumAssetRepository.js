import ETHEREUM_CONSTANTS from './EthereumAssetConstants';

export function getEthereumTransactionsByAddress(address) {
  let params = {
    address,
    module: 'account',
    action: 'txlist',
    startblock: 0,
    endblock: 99999999,
    sort: 'desc',
    apikey: ETHEREUM_CONSTANTS.ETHERSCAN_API_INFO.API_KEY,
  };
  const queryString = objToQueryString(params);
  return fetch(`${ETHEREUM_CONSTANTS.ETHERSCAN_API_ROOT_URL}?${queryString}`);
}

export function getEthereumGas() {
  return fetch(ETHEREUM_CONSTANTS.ETHEREUM_API_GET_GAS_URL);
}

export function getEtherscanTxUrl() {
  return ETHEREUM_CONSTANTS.ETHERSCAN_TX_URL;
}

export function getEtherscanAddressUrl() {
  return ETHEREUM_CONSTANTS.ETHERSCAN_ADDRESS_URL;
}

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.join('&');
}
