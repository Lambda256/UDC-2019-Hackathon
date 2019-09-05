import ETHEREUM_CONSTANTS from './EthereumAssetConstants';

export function getTransactionERC20ByAddress(address, contractaddress) {
  let params = {
    address,
    contractaddress,
    module: 'account',
    action: 'tokentx',
    startblock: 0,
    endblock: 99999999,
    sort: 'desc',
    apikey: ETHEREUM_CONSTANTS.ETHERSCAN_API_INFO.API_KEY,
  };
  const queryString = objToQueryString(params);
  return fetch(`${ETHEREUM_CONSTANTS.ETHERSCAN_API_ROOT_URL}?${queryString}`);
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
