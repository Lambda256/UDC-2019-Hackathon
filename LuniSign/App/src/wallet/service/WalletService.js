import 'ethers/dist/shims.js';
import Transaction from 'ethereumjs-tx';
import Web3 from 'web3';
import Globals from '../../config/Globals';
import minABI from './ContractABI';
import * as lightwallet from 'eth-lightwallet';
import eccrypto from 'eccrypto';
import {
  convertBufferToHexString,
  convertHexStringToBuffer,
} from '../../common/function/CryptoUtil';

let walletInstance;

export default class WalletService {
  web3;
  contract;
  keystore;
  pubKey;
  mnemonic = '';
  address = '';

  ETHEREUM_HD_PATH = "m/44'/60'/0'/0/0";

  static createWalletService = () => {
    return new WalletService();
  };

  constructor() {
    if (walletInstance) {
      return walletInstance;
    }
    walletInstance = this;
  }

  setWeb3 = async () => {
    if (this.web3 === undefined || this.web3 === null) {
      this.web3 = await new Web3(
        new Web3.providers.HttpProvider(
          `https://${
            Globals.__LuniSign_DEV__ ? 'ropsten' : 'mainnet'
          }.infura.io/v3/8eb6c4218f8f4352bef52df3668cbfde`,
        ),
        undefined,
        {
          transactionConfirmationBlocks: 6,
          transactionBlockTimeout: 24,
        },
      );
    }
  };

  setContract = async contractAddress => {
    if (this.contract === undefined || this.contract === null) {
      this.contract = await new this.web3.eth.Contract(
        minABI,
        contractAddress,
        {
          from: this.address,
          transactionConfirmationBlocks: 1,
        },
      );
    }
  };

  setMnemonic = async mnemonic => {
    this.mnemonic = mnemonic;
  };

  setWalletStoreInfo = async walletStore => {
    walletStore.setNetwork(Globals.__LuniSign_DEV__ ? 'ropsten' : 'mainnet');
    walletStore.setSeedPhrase(this.mnemonic); // TODO: 암호화해서 넣기
    await walletStore.setAddress(this.address);
    walletStore.setPubKey(convertBufferToHexString(this.pubKey));
    walletStore.setKeystore(this.keystore);
  };

  getWalletBalance = async address => {
    try {
      const balance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(balance || 0, 'ether');
    } catch (e) {
      console.log('=== getWalletBalance error : ', e);
    }
  };

  getERC20Balance = async (contractAddress, walletAddress) => {
    try {
      const balance = await this.contract.methods
        .balanceOf(walletAddress)
        .call();
      const decimals = await this.contract.methods.decimals().call();
      return balance / Math.pow(10, decimals);
    } catch (e) {
      console.log('=== getERC20Balance error : ', e);
    }
  };

  getRandomSeed = async () => {
    return await lightwallet.keystore.generateRandomSeed(
      this.web3.utils.randomHex(32),
    );
  };

  getTransactionCount = async () => {
    return await this.web3.eth.getTransactionCount(this.address);
  };

  // FIXME : serializedKeystore -> objectKeystore
  // updateKeystoreObject = (serializedKeystore) => {
  // };

  getEthereumTxParams = ({
    toAddress,
    amount,
    gasLimit,
    gasPrice,
    count,
    memo,
  }) => {
    return {
      from: this.web3.utils.toChecksumAddress(this.address),
      to: this.web3.utils.toChecksumAddress(toAddress),
      value: this.web3.utils.toHex(amount),
      gas: this.web3.utils.toHex(gasLimit),
      gasPrice: this.web3.utils.toHex(gasPrice),
      nonce: this.web3.utils.toHex(count),
      chainId: Globals.__LuniSign_DEV__ ? 3 : 1,
      data: null,
      memo: memo,
    };
  };

  getERC20TxParams = ({
    contractAddress,
    toAddress,
    amount,
    gasLimit,
    gasPrice,
    count,
    memo,
  }) => {
    return {
      from: this.web3.utils.toChecksumAddress(this.address),
      to: contractAddress,
      value: '0x0',
      gas: this.web3.utils.toHex(gasLimit),
      gasPrice: this.web3.utils.toHex(gasPrice),
      nonce: this.web3.utils.toHex(count),
      chainId: Globals.__LuniSign_DEV__ ? 3 : 1,
      data: this.contract.methods
        .transfer(toAddress, this.web3.utils.toHex(amount))
        .encodeABI(),
      memo: memo,
    };
  };

  getTxParams = params => {
    if (params.contractAddress) {
      return this.getERC20TxParams(params);
    } else {
      return this.getEthereumTxParams(params);
    }
  };

  getPrvKeyBufferFromPwDerivedKey = (ks, pwDerivedKey, address) => {
    return convertHexStringToBuffer(ks.exportPrivateKey(address, pwDerivedKey));
  };

  getPubKeyByEccrypto = pubKeyBuffer => {
    return eccrypto.getPublic(pubKeyBuffer);
  };

  // getPrvKeyBufferFromPwDerivedKey = (ks, pwDerivedKey) => {
  //   return convertHexStringToBuffer(
  //     ks.exportPrivateKey(this.address, pwDerivedKey),
  //   );
  // };

  // createVault = (walletStore, seedPhrase, password) => {
  //   return new Promise(resolve => {
  //     lightwallet.keystore.createVault(
  //       {
  //         password,
  //         seedPhrase,
  //         hdPathString: this.ETHEREUM_HD_PATH,
  //       },
  //       (error, ks) => {
  //         ks.keyFromPassword(password, (error, pwDerivedKey) => {
  //           if (error) {
  //             throw error;
  //           }
  //
  //           ks.generateNewAddress(pwDerivedKey, 1);
  //           this.address = ks.getAddresses()[0];
  //           this.keystore = ks.serialize();
  //
  //           resolve(this.setWalletStoreInfo(walletStore));
  //         });
  //       },
  //     );
  //   });
  // };
  createVault = (walletStore, seedPhrase, password) => {
    return new Promise(resolve => {
      lightwallet.keystore.createVault(
        {
          password,
          seedPhrase,
          hdPathString: this.ETHEREUM_HD_PATH,
        },
        (error, ks) => {
          ks.keyFromPassword(password, (error, pwDerivedKey) => {
            if (error) {
              throw error;
            }

            ks.generateNewAddress(pwDerivedKey, 1);
            this.address = ks.getAddresses()[0];
            this.pubKey = this.getPubKeyByEccrypto(
              this.getPrvKeyBufferFromPwDerivedKey(
                ks,
                pwDerivedKey,
                this.address,
              ),
            );
            this.keystore = ks.serialize();

            resolve(this.setWalletStoreInfo(walletStore));
          });
        },
      );
    });
  };

  createNewWallet = async (walletStore, password) => {
    const mnemonic = await this.getRandomSeed();
    this.mnemonic = mnemonic;
    await this.createVault(walletStore, mnemonic, password);
  };

  restoreWallet = async (walletStore, mnemonic, password) => {
    await this.createVault(walletStore, mnemonic, password);
  };

  loadWallet = async (address, mnemonic, keystore) => {
    this.address = address;
    this.mnemonic = mnemonic;
    this.keystore = keystore;
    return {
      mnemonic: mnemonic,
      address: address,
    };
  };

  validateMnemonic = (mnemonic = '') => {
    // return ethers.utils.HDNode.isValidMnemonic(mnemonic);
    return lightwallet.keystore.isSeedValid(mnemonic);
  };

  validateAddress = address => {
    return this.web3.utils.isAddress(address);
  };

  validatePassword = password => {
    return new Promise(resolve => {
      const ks = lightwallet.keystore.deserialize(this.keystore);
      ks.keyFromPassword(password, async (error, pwDerivedKey) => {
        if (error) {
          throw error;
        }
        resolve(ks.isDerivedKeyCorrect(pwDerivedKey));
      });
    });
  };

  getPrvKeyBuffer = (keystore, address) => {
    return new Promise(resolve => {
      const ks = lightwallet.keystore.deserialize(keystore);
      ks.keyFromPassword('', async (error, pwDerivedKey) => {
        if (error) {
          throw error;
        }
        resolve(
          this.getPrvKeyBufferFromPwDerivedKey(ks, pwDerivedKey, address),
        );
      });
    });
  };

  signTransactionUsingKeystore = params => {
    return new Promise(resolve => {
      const ks = lightwallet.keystore.deserialize(this.keystore);

      ks.keyFromPassword(params.password, async (error, pwDerivedKey) => {
        if (error) {
          throw error;
        }

        params.count = await this.getTransactionCount();
        const txParams = this.getTxParams(params);
        const tx = new Transaction(txParams);
        const rawTx = tx.serialize().toString('hex');

        resolve(
          lightwallet.signing.signTx(ks, pwDerivedKey, rawTx, this.address),
        );
      });
    });
  };

  signGeneratedTransaction = txParams => {
    return new Promise(resolve => {
      const ks = lightwallet.keystore.deserialize(this.keystore);
      ks.keyFromPassword('', async (error, pwDerivedKey) => {
        if (error) {
          throw error;
        }
        try {
          const tx = new Transaction(txParams);
          tx.sign(
            convertHexStringToBuffer(
              ks.exportPrivateKey(this.address, pwDerivedKey),
            ),
          );
          resolve(tx.serialize().toString('hex'));
        } catch (e) {
          console.error(e);
        }
      });
    });
  };

  getSerializedSignTransaction = async params => {
    return await this.signTransactionUsingKeystore(params);
  };

  // -----
  // generateNewAddress = function(pwDerivedKey, n) {
  //   if (!this.isDerivedKeyCorrect(pwDerivedKey)) {
  //     throw new Error('Incorrect derived key!');
  //   }
  //
  //   if (!this.encSeed) {
  //     throw new Error('KeyStore.generateNewAddress: No seed set');
  //   }
  //   n = n || 1;
  //   var keys = this._generatePrivKeys(pwDerivedKey, n);
  //
  //   for (var i = 0; i < n; i++) {
  //     var keyObj = keys[i];
  //     var address = KeyStore._computeAddressFromPrivKey(keyObj.privKey);
  //     this.encPrivKeys[address] = keyObj.encPrivKey;
  //     this.addresses.push(address);
  //   }
  // };
  //
  // _decryptString = function(encryptedStr, pwDerivedKey) {
  //   var secretbox = nacl.util.decodeBase64(encryptedStr.encStr);
  //   var nonce = nacl.util.decodeBase64(encryptedStr.nonce);
  //
  //   var decryptedStr = nacl.secretbox.open(secretbox, nonce, pwDerivedKey);
  //
  //   if (decryptedStr === undefined) {
  //     throw new Error('Decryption failed!');
  //   }
  //
  //   return nacl.util.encodeUTF8(decryptedStr);
  // };
  //
  // _generatePrivKeys = function(pwDerivedKey, n) {
  //   if (!this.isDerivedKeyCorrect(pwDerivedKey)) {
  //     throw new Error('Incorrect derived key!');
  //   }
  //
  //   var hdRoot = this._decryptString(this.encHdRootPriv, pwDerivedKey);
  //
  //   if (hdRoot.length === 0) {
  //     throw new Error('Provided password derived key is wrong');
  //   }
  //
  //   var keys = [];
  //   for (var i = 0; i < n; i++) {
  //     var hdprivkey = new bitcore.HDPrivateKey(hdRoot).derive(this.hdIndex++);
  //     var privkeyBuf = hdprivkey.privateKey.toBuffer();
  //
  //     var privkeyHex = privkeyBuf.toString('hex');
  //     if (privkeyBuf.length < 16) {
  //       // Way too small key, something must have gone wrong
  //       // Halt and catch fire
  //       throw new Error(
  //         'Private key suspiciously small: < 16 bytes. Aborting!',
  //       );
  //     } else if (privkeyBuf.length < 32) {
  //       // Pad private key if too short
  //       // bitcore has a bug where it sometimes returns
  //       // truncated keys
  //       privkeyHex = leftPadString(privkeyBuf.toString('hex'), '0', 64);
  //     } else if (privkeyBuf.length > 32) {
  //       throw new Error('Private key larger than 32 bytes. Aborting!');
  //     }
  //
  //     var encPrivKey = KeyStore._encryptKey(privkeyHex, pwDerivedKey);
  //     keys[i] = {
  //       privKey: privkeyHex,
  //       encPrivKey: encPrivKey,
  //     };
  //   }
  //
  //   return keys;
  // };
}
