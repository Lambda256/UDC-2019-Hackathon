const LuniSign = artifacts.require("LuniSign");
const assertRevert = require("./assertRevert");
const eccrypto = require("eccrypto");

contract("LuniSign", ([deployer, dapp, user1, user2]) => {

  let luniSign;
  let privateKey;
  let publicKey;
  let userInfo;

  let privateKeyForDapp;
  let publicKeyForDapp;
  let dappInfo;

  let privateKeyForDapp1;
  let publicKeyForDapp1;
  let dappInfo1;

  // ========== Utils Start
  function encryptingTheMsg(_publicKey, _msg) {
    return eccrypto.encrypt(_publicKey, Buffer.from(_msg));
  }

  function decryptingTheMsg(_privateKey, _msg) {
    return eccrypto.decrypt(_privateKey, _msg);
  }

  function convertObjHexToEncrypted(obj) {
    return {
      iv: convertHexStringToBuffer(obj.iv),
      ephemPublicKey: convertHexStringToBuffer(obj.ephemPublicKey),
      ciphertext: convertHexStringToBuffer(obj.ciphertext),
      mac: convertHexStringToBuffer(obj.mac)
    }
  }

  function convertObjEncryptedToHex(obj) {
    return {
      iv: convertBufferToHexString(obj.iv),
      ephemPublicKey: convertBufferToHexString(obj.ephemPublicKey),
      ciphertext: convertBufferToHexString(obj.ciphertext),
      mac: convertBufferToHexString(obj.mac)
    }
  }

  function convertBufferToHexString(byteArray) {
    return Array.from(byteArray, function (byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }

  function convertHexStringToBuffer(value) {
    return Buffer.from(value.replace("0x", ""), "hex");
  }

  function jsonToString(json) {
    return JSON.stringify(json);
  }

  function stringToJson(str) {
    return JSON.parse(str);
  }

  function dappIconsToString(icons) {
    let value = "";
    icons.map((item, index, array) => {
      value += item + " ";
    });
    return value;
  }

  function defaultInfoConsole() {
    console.log();
    console.log(`##################################################################`);
    console.log(`### \t`);
    console.log(`### \t DEFAULT INFO`);
    console.log(`### \t`);
    console.log(`### \t deployer address: ${deployer}`);
    console.log(`### \t dapp address: ${dapp}`);
    console.log(`### \t user1 address: ${user1}`);
    console.log(`### \t user2 address: ${user2}`);
    console.log(`### \t`);
    console.log(`### \t LuniSign is deployed: ${luniSign.address}`);
    console.log(`### \t`);
    console.log(`### \t user name: ${userInfo.name}`);
    console.log(`### \t user email: ${userInfo.email}`);
    console.log(`### \t user phone: ${userInfo.phone}`);
    console.log(`### \t`);
    console.log(`##################################################################`);
    console.log();
  }

  // ========== Utils End

  // ========== Initialize Start
  before(async () => {

    // EndUser (LuniSign 사용자) 키
    // A new random 32-byte private key.
    privateKey = eccrypto.generatePrivate();
    // Corresponding uncompressed (65-byte) public key.
    publicKey = eccrypto.getPublic(privateKey);

    // DAPP 1
    // A new random 32-byte private key.
    privateKeyForDapp = eccrypto.generatePrivate();
    // Corresponding uncompressed (65-byte) public key.
    publicKeyForDapp = eccrypto.getPublic(privateKeyForDapp);

    // DAPP 2
    // A new random 32-byte private key.
    privateKeyForDapp1 = eccrypto.generatePrivate();
    // Corresponding uncompressed (65-byte) public key.
    publicKeyForDapp1 = eccrypto.getPublic(privateKeyForDapp);

    luniSign = await LuniSign.new();

    userInfo = {
      name: "홍길동",
      email: "aaa@abc.com",
      phone: "01012341234"
    };

    dappInfo = {
      publicKey: convertBufferToHexString(publicKeyForDapp),
      name: "루니버스타 케이",
      description: "아이돌을 발굴해낸다.",
      icons: ["https://cdn.luniverse.io/bonjour/favicon/favicon-32x32.png",
        "https://cdn.luniverse.io/bonjour/favicon/favicon-32x32.png"],
      url: "http://localhost:8080"
    };

    dappInfo1 = {
      publicKey: convertBufferToHexString(publicKeyForDapp1),
      name: "루니버스타 케이 2",
      description: "아이돌을 발굴해낸다.22",
      icons: ["https://cdn.luniverse.io/bonjour/favicon/favicon-32x32.png",
        "https://cdn.luniverse.io/bonjour/favicon/favicon-32x32.png"],
      url: "http://localhost:8080"
    };

    defaultInfoConsole();
  });
  // ========== Initialize End

  // ========== Test Start
  describe("루니사인 - 루니사인 회원가입 및 Dapp 로그인", () => {
    it("개인정보내역 등록 테스트", async () => {
      const encrypted = await encryptingTheMsg(publicKey, jsonToString(userInfo));
      await luniSign.registerUser(
          convertBufferToHexString(encrypted.iv),
          convertBufferToHexString(encrypted.ephemPublicKey),
          convertBufferToHexString(encrypted.ciphertext),
          convertBufferToHexString(encrypted.mac),
          {from: user1}
      );

      const findUser = await luniSign.findUser({from: user1});
      const plaintext = await decryptingTheMsg(privateKey, convertObjHexToEncrypted(findUser));
      const user = stringToJson(plaintext);

      assert.equal(user.name, "홍길동");
      assert.equal(user.email, "aaa@abc.com");
      assert.equal(user.phone, "01012341234");
    });

    it("등록안된 개인정보내역 조회 테스트", async () => {
      await assertRevert(luniSign.findUser({
        from: user2
      }));
    });

    it("개인별 DAPP 등록 테스트", async () => {

      // 사용자가 로그인한 Dapp 정보를 등록한다.
      await luniSign.registerUseDapp(
          dappInfo.publicKey, dappInfo.name, dappInfo.description, dappIconsToString(dappInfo.icons), dappInfo.url,
          false,
          {from: user1});

      // 사용자가 로그인한 Dapp 상세 정보를 조회한다.
      const findByPublicKeyForUseDapp = await luniSign.findOneByUserAddressAndPublicKeyForUseDapp(dappInfo.publicKey,
          {from: user1});

      assert.equal(findByPublicKeyForUseDapp.publicKey, dappInfo.publicKey);
      assert.equal(findByPublicKeyForUseDapp.name, dappInfo.name);
      assert.equal(findByPublicKeyForUseDapp.description, dappInfo.description);
      assert.equal(findByPublicKeyForUseDapp.icons, dappIconsToString(dappInfo.icons));
      assert.equal(findByPublicKeyForUseDapp.url, dappInfo.url);
      assert.equal(findByPublicKeyForUseDapp.isProvided, false);
    });

    it("개인별 DAPP 목록 조회 테스트", async () => {

      // 사용자가 로그인한 Dapp 정보를 등록한다. 2번째
      await luniSign.registerUseDapp(
          dappInfo1.publicKey, dappInfo1.name, dappInfo1.description, dappIconsToString(dappInfo1.icons), dappInfo1.url,
          false,
          {from: user1});

      // 사용자가 로그인한 Dapp 정보를 목록으로 조회한다. 없애버림...
      // const findAllForUseDappList = await luniSign.findAllByUserAddressForUseDapp({from: user1});

      // 사용자가 로그인한 Dapp 목록 조회를 아이디 값을 구하고 각각 상세조회방식으로 다시 조회한다.
      const ids = await luniSign.findAllByUserAddressForUseDappIds({from: user1});
      const useDappList = [];
      for (let i = 0; i < ids.length; i++) {
        const dappDetail = await luniSign.findOneByDappId(ids[i], {from: user1});
        const useDapp = {
          id: dappDetail.id,
          publicKey: dappDetail.publicKey,
          name: dappDetail.name,
          description: dappDetail.description,
          icons: dappDetail.icons,
          url: dappDetail.url,
          isProvided: dappDetail.isProvided
        };
        useDappList.push(useDapp);
      }

      assert.equal(useDappList[0].publicKey, dappInfo.publicKey);
      assert.equal(useDappList[0].name, dappInfo.name);
      assert.equal(useDappList[0].description, dappInfo.description);
      assert.equal(useDappList[0].icons, dappIconsToString(dappInfo.icons));
      assert.equal(useDappList[0].url, dappInfo.url);
      assert.equal(useDappList[0].isProvided, false);
    });
  });

  describe("루니사인 - 로그인 후 개인정보제공 테스트", async () => {

    it("사용자가 Dapp 별 개인정보 제공 허용으로 변경 테스트", async () => {

      //***
      //*** 루니사인 앱에서 실행
      //***

      // dapp publicKey 로 개인정보 암호화
      const encryptedUser = await encryptingTheMsg(convertHexStringToBuffer(dappInfo.publicKey),
          jsonToString(userInfo));

      const encryptedUserChange = {
        ...convertObjEncryptedToHex(encryptedUser)
      };

      // 사용자가 Dapp 별 개인정보 제공 여부 변경
      await luniSign.updateIsProvidedForDapp(
          dappInfo.publicKey,
          true,
          user1,
          encryptedUserChange.iv,
          encryptedUserChange.ephemPublicKey,
          encryptedUserChange.ciphertext,
          encryptedUserChange.mac,
          {from: user1}
      );

      // 개인정보 제공여부 변경 후 사용자가 로그인한 Dapp 상세 정보를 조회한다.
      const findOneByUserAddressAndPublicKeyForUseDapp = await luniSign.findOneByUserAddressAndPublicKeyForUseDapp(
          dappInfo.publicKey, {from: user1});

      assert.equal(findOneByUserAddressAndPublicKeyForUseDapp.isProvided, true);

      //***
      //*** 데모 DAPP 앱에서 실행
      //***

      // 허용시 Dapp 사에서 개인별 개인정보 조회 테스트
      const getEncryptUserInfo = await luniSign.findOneByUserAddressAndPublicKeyForUserInfo(user1, dappInfo.publicKey,
          {from: dapp});
      assert.equal(getEncryptUserInfo.userAddress, user1);

      // Dapp 사 개인키로 복호화
      const plaintext = await decryptingTheMsg(privateKeyForDapp, convertObjHexToEncrypted(getEncryptUserInfo));
      const getUserInfo = stringToJson(plaintext);
      assert.equal(getUserInfo.name, userInfo.name);
      assert.equal(getUserInfo.email, userInfo.email);
      assert.equal(getUserInfo.phone, userInfo.phone);
    });

    it("사용자가 Dapp 별 개인정보 제공 허용 안함으로 변경 테스트", async () => {

      //***
      //*** 루니사인 앱에서 실행
      //***

      // 사용자가 Dapp 별 개인정보 제공 허용 안함 -- 테스트시에 오버라이딩이 적용이 안되어서 함수를 하나더 만듬
      await luniSign.updateIsProvidedFalseForDapp(dappInfo.publicKey, false, {from: user1});

      // 개인정보 제공 허용 안함 후 사용자가 로그인한 Dapp 상세 정보를 조회한다.
      const findOneByUserAddressAndPublicKeyForUseDapp = await luniSign.findOneByUserAddressAndPublicKeyForUseDapp(
          dappInfo.publicKey,
          {from: user1});

      assert.equal(findOneByUserAddressAndPublicKeyForUseDapp.isProvided, false);

      //***
      //*** 데모 DAPP 앱에서 실행
      //***

      // dapp 사에서 허용 안할 시 Dapp 사에서 개인별 개인정보 조회 테스트
      await assertRevert(luniSign.findOneByUserAddressAndPublicKeyForUserInfo(user1, dappInfo.publicKey, {from: dapp}));

    });
  });

  describe("루니사인 - 본인인증 테스트", async () => {
    it("본인맞음을 증명한 테스트", async () => {

      //***
      //*** 루니사인 앱에서 실행
      //***

      let randomStr = "12345";  // randomStr 문자열은 데모 DAPP 에 제공한 모듈에서 생성하여 루니사인 앱으로 전달하는 것이다.
      await luniSign.registerIV(randomStr, {from: user1});

      //***
      //*** 데모 DAPP 앱에서 실행
      //***

      const isOk = await luniSign.checkIV(user1, randomStr, {from: dapp});
      assert.equal(isOk, true);
    });

    it("본인이 아님을 증명한 테스트", async () => {

      //***
      //*** 루니사인 앱에서 실행
      //***

      let randomStr = "12345";  // randomStr 문자열은 데모 DAPP 에 제공한 모듈에서 생성하여 루니사인 앱으로 전달하는 것이다.
      await luniSign.registerIV(randomStr, {from: user1});

      //***
      //*** 데모 DAPP 앱에서 실행
      //***

      const isOk = await luniSign.checkIV(user1, randomStr + "6", {from: dapp});
      assert.equal(isOk, false);
    });
  });
  // ========== Test End
});
