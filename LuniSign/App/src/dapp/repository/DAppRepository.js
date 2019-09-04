const dappHeaderConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Authorization:
      'Bearer XbBKDr56DNyv6dmUV2PF88FhegdiFxy16xwKL5fW5F3gn4bPSiz5H21RKBAhu6iY',
};

const findUserFromContract = async params => {
  return await fetch(
      'https://api.luniverse.net/tx/v1.0/transactions/findUser',
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: dappHeaderConfig,
      },
  );
};

const registerUserToContract = async params => {
  return await fetch(
      'https://api.luniverse.net/tx/v1.0/transactions/registerUser',
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: dappHeaderConfig,
      },
  );
};

const registerIVToContract = async params => {
  return await fetch(
      'https://api.luniverse.net/tx/v1.0/transactions/registerIV',
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: dappHeaderConfig,
      },
  );
};

const registerUseDappToContract = async params => {
  // console.log(' === register dapp request params', params);
  return await fetch(
      'https://api.luniverse.net/tx/v1.0/transactions/registerUseDapp',
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: dappHeaderConfig,
      },
  );
};

const getUsedDappIdsFromContract = async params => {
  return await fetch(
      'https://api.luniverse.net/tx/v1.0/transactions/getUsedDappIds',
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: dappHeaderConfig,
      },
  );
};

const getUsedDappFromContract = async params => {
  return await fetch(
      'https://api.luniverse.net/tx/v1.0/transactions/getUsedDapp',
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: dappHeaderConfig,
      },
  );
};

const getUsedDappByIdFromContract = async params => {
  return await fetch(
      'https://api.luniverse.net/tx/v1.0/transactions/getUsedDappId',
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: dappHeaderConfig,
      },
  );
};

const updateDappProvidingToContract = async params => {
  return await fetch(
      'https://api.luniverse.net/tx/v1.0/transactions/updateDappProviding',
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: dappHeaderConfig,
      },
  );
};

const getBalanceFromAPI = async (address, mainToken, sideToken) => {
  return await fetch(
      `https://api.luniverse.net/tx/v1.0/wallets/${address}/${mainToken}${
          sideToken !== '' ? `/${sideToken}` : ''
          }/balance`,
      {
        method: 'GET',
        headers: dappHeaderConfig,
      },
  );
};

const rewardTokenFromContract = async params => {
  return await fetch(
      'https://api.luniverse.net/tx/v1.0/transactions/rewardToken',
      {
        method: 'POST',
        body: JSON.stringify(params),
        headers: dappHeaderConfig,
      },
  );
};

export {
  registerUserToContract,
  registerIVToContract,
  registerUseDappToContract,
  findUserFromContract,
  getUsedDappFromContract,
  getUsedDappByIdFromContract,
  getUsedDappIdsFromContract,
  getBalanceFromAPI,
  updateDappProvidingToContract,
  rewardTokenFromContract,
};
