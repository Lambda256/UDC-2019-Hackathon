import {Buffer} from 'buffer';
import eccrypto from 'eccrypto';

function slicePrefix(string) {
  return string.slice(4);
}

// ======================================================
// Converting Methods

function convertBufferToHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
}

function convertHexStringToBuffer(value) {
  return Buffer.from(value.replace('0x', ''), 'hex');
}

function convertReturnObjToEncrypted(obj) {
  return {
    iv: convertHexStringToBuffer(obj.iv),
    ephemPublicKey: convertHexStringToBuffer(obj.ephemPublicKey),
    ciphertext: convertHexStringToBuffer(obj.ciphertext),
    mac: convertHexStringToBuffer(obj.mac),
  };
}

function convertEncryptedBytesToHex({iv, ciphertext, mac, ephemPublicKey}) {
  return {
    iv: convertBufferToHexString(iv),
    ciphertext: convertBufferToHexString(ciphertext),
    mac: convertBufferToHexString(mac),
    ephemPublicKey: convertBufferToHexString(ephemPublicKey),
  };
}

function dappIconsToString(icons) {
  let value = '';
  icons.map((item, index, array) => {
    value += item + ' ';
  });
  return value;
}

function convertDecryptedHexToBytes(res) {
  return {
    iv: convertHexStringToBuffer(res[0]),
    ephemPublicKey: convertHexStringToBuffer(res[1]),
    ciphertext: convertHexStringToBuffer(res[2]),
    mac: convertHexStringToBuffer(res[3]),
  };
}

function convertDecryptedArrayToObject(res) {
  return {
    iv: res[0],
    ephemPublicKey: res[1],
    ciphertext: res[2],
    mac: res[3],
  };
}

// ======================================================
// Encrypt, Decrypt methods

async function encryptUserInfo(pubKeyBuffer, userInfo) {
  return await eccrypto.encrypt(
    pubKeyBuffer,
    Buffer.from(JSON.stringify(userInfo)),
  );
}

// =======================================================

function requestSmartContractAPIByLEOA() {}

export {
  slicePrefix,
  convertBufferToHexString,
  convertHexStringToBuffer,
  convertReturnObjToEncrypted,
  encryptUserInfo,
  convertEncryptedBytesToHex,
  convertDecryptedHexToBytes,
  convertDecryptedArrayToObject,
  dappIconsToString,
};
