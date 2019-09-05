import {ethers} from 'ethers';
import EthCrypto from 'eth-crypto';
import Web3 from 'web3';
import HDWalletProvider from 'react-native-truffle-hdwallet-provider';
import Globals from '../../config/Globals';

const ETHEREUM_HD_PATH = "m/44'/60'/0'/0/0";
let ethersWallet;

// eth-crypto ==============================================================

const encryptWithPublicKey = async (publicKey, msg) => {
  return await EthCrypto.encryptWithPublicKey(publicKey, msg);
};

const decryptWithPrivateKey = async (privateKey, encrypted) => {
  return await EthCrypto.decryptWithPrivateKey(privateKey, encrypted);
};

// ethers ==============================================================

const createWallet = (password = '') => {
  try {
    // Random bytes
    // const bytes = ethers.utils.randomBytes(16);
    // const mnemonics = ethers.utils.HDNode.entropyToMnemonic(
    //     bytes,
    //     ethers.wordlists.en,
    // );
    // Generate Wallet Objects
    // ethersWallet = ethers.Wallet.fromMnemonic(mnemonics);
    ethersWallet = ethers.Wallet.createRandom();
    console.log('======================= create ethersWallet');
    console.log(ethersWallet);
    // const jsonWallet = await ethersWallet.encrypt(password);
    console.log(
      '======================= create encrypted ethersWallet.signingKey',
    );
    // console.log(ethersWallet.signingKey);
    return {
      walletKey: ethersWallet.signingKey,
      // jsonWallet: jsonWallet,
    };
  } catch (e) {
    console.error(e);
  }
};

const loadWallet = async (mnemonic, password = '') => {
  // ethersWallet = await ethers.Wallet.fromEncryptedJson(mnemonic, password);
  ethersWallet = await ethers.Wallet.fromMnemonic(mnemonic);
};

const signing = async rawTx => {
  return await ethersWallet.sign(rawTx);
};

const weiFormatEther = wei => {
  return ethers.utils.formatEther(wei, {commify: true});
};

const signingEthereumTx = async rawTx => {
  // FIXME: Web3 사용해서 Sign
  // const tx = new Transaction(rawTx);
  // tx.sign(convertHexStringToBuffer(ethersWallet.privateKey));
  // return tx.serialize().toString('hex');
  return await signingWeb3(rawTx);
};

const signingWeb3 = async tx => {
  const provider = new HDWalletProvider(
    ethersWallet.mnemonic,
    `https://${
      Globals.__LuniSign_DEV__ ? 'ropsten' : 'mainnet'
    }.infura.io/v3/8eb6c4218f8f4352bef52df3668cbfde`,
  );
  const web3 = new Web3(provider);
  // return await web3.eth.signTransaction(tx);
  return web3.eth.accounts.signTransaction(
    tx,
    ethersWallet.signingKey.privateKey,
  );
};

export {
  ethersWallet,
  createWallet,
  encryptWithPublicKey,
  decryptWithPrivateKey,
  loadWallet,
  signing,
  signingEthereumTx,
  weiFormatEther,
};
