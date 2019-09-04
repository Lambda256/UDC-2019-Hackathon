pragma solidity >=0.4.21 <0.6.0;
pragma experimental "ABIEncoderV2";

contract LuniSign {

    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    struct User {
        address payable userAddress;
        string iv;                //Initialization vector (16 bytes)
        string ephemPublicKey;    //Ephemeral public key (65 bytes)
        string ciphertext;        //The result of encryption (variable size)
        string mac;               //Message authentication code (32 bytes)
        Dapp[] useDapps;
    }

    mapping(address => User) internal _userMap;

    //
    //
    //  사용자 기능 (dapp 연관)
    //
    //

    // 개인정보내역 등록
    function setUser(string memory _iv, string memory _ephemPublicKey, string memory _ciphertext, string memory _mac) private {
        User storage newUser = _userMap[msg.sender];
        newUser.userAddress = msg.sender;
        newUser.iv = _iv;
        newUser.ephemPublicKey = _ephemPublicKey;
        newUser.ciphertext = _ciphertext;
        newUser.mac = _mac;
        _userMap[msg.sender] = newUser;
    }

    function registerUser(string memory iv, string memory ephemPublicKey, string memory ciphertext, string memory mac) public {
        setUser(iv, ephemPublicKey, ciphertext, mac);
    }

    // 개인정보내역 조회
    function getUser() private view returns (User memory user) {
        return _userMap[msg.sender];
    }

    function findUser() public view returns (string memory iv, string memory ephemPublicKey, string memory ciphertext, string memory mac){
        User memory tempUser = getUser();
        require(tempUser.userAddress != address(0), "do not register User");
        iv = tempUser.iv;
        ephemPublicKey = tempUser.ephemPublicKey;
        ciphertext = tempUser.ciphertext;
        mac = tempUser.mac;
    }

    // 사용자가 로그인하는 DAPP 등록
    function pushDappInUser(string memory _pubKey) private {
        User storage tempUser = _userMap[msg.sender];
        tempUser.useDapps.push(_dappMap[_pubKey]);
        _userMap[msg.sender] = tempUser;
    }

    // 사용자가 로그인하는 DAPP 등록
    function registerUseDapp(string memory publicKey, string memory name, string memory description, string memory icons, string memory url, bool isProvided) public {
        setDapp(publicKey, name, description, icons, url, isProvided);
        pushDappInUser(publicKey);
    }

    function getDappInUser(string memory _publicKey) private view returns (Dapp memory dapp){
        User memory tempUser = getUser();
        require(tempUser.userAddress != address(0), "do not register User");

        for (uint i = 0; i < tempUser.useDapps.length; i++) {
            if (keccak256(abi.encodePacked(tempUser.useDapps[i].publicKey)) == keccak256(abi.encodePacked(_publicKey))) {
                return tempUser.useDapps[i];
            }
        }
    }

    // 사용자가 로그인한 DAPP 상세 조회 publicKey
    function findOneByUserAddressAndPublicKeyForUseDapp(string memory pubKey) public view returns (string memory publicKey, string memory name, string memory description, string memory icons, string memory url, bool isProvided){
        Dapp memory dapp = getDappInUser(pubKey);

        publicKey = dapp.publicKey;
        name = dapp.name;
        description = dapp.description;
        icons = dapp.icons;
        url = dapp.url;
        isProvided = dapp.isProvided;
    }

    // 사용자가 로그인한 DAPP 들의 아이디 목록 조회
    function findAllByUserAddressForUseDappIds() public view returns (uint[] memory useDappIds){
        User memory tempUser = getUser();
        require(tempUser.userAddress != address(0), "do not register User");

        uint[] memory ids = new uint[](tempUser.useDapps.length);
        for (uint i = 0; i < tempUser.useDapps.length; i++) {
            ids[i] = tempUser.useDapps[i].id;
        }

        return (ids);
    }

    // 사용자가 로그인한 DAPP 아이디로 상세 조회
    function findOneByDappId(uint dappId) public view returns (uint id, string memory publicKey, string memory name, string memory description, string memory icons, string memory url, bool isProvided){
        User memory tempUser = getUser();
        require(tempUser.userAddress != address(0), "do not register User");

        for (uint i = 0; i < tempUser.useDapps.length; i++) {
            if (tempUser.useDapps[i].id == dappId) {
                id = tempUser.useDapps[i].id;
                publicKey = tempUser.useDapps[i].publicKey;
                name = tempUser.useDapps[i].name;
                description = tempUser.useDapps[i].description;
                icons = tempUser.useDapps[i].icons;
                url = tempUser.useDapps[i].url;
                isProvided = tempUser.useDapps[i].isProvided;
            }
        }
    }

    // 사용자가 원하는 DAPP 에게 사용자의 개인정보내역을 제공하는 것을 변경
    //    function updateIsProvidedForDapp(string memory publicKey, bool isProvided, UserInfo memory userInfo) public {
    function updateIsProvidedForDapp(string memory publicKey, bool isProvided, address userAddress, string memory iv, string memory ephemPublicKey, string memory ciphertext, string memory mac) public {
        User storage tempUser = _userMap[msg.sender];
        require(tempUser.userAddress != address(0), "do not register User");

        for (uint i = 0; i < tempUser.useDapps.length; i++) {
            if (keccak256(abi.encodePacked(tempUser.useDapps[i].publicKey)) == keccak256(abi.encodePacked(publicKey))) {
                tempUser.useDapps[i].isProvided = isProvided;
                _userMap[msg.sender] = tempUser;
            }
        }

        bool updateCheck = false;
        UserInfo[] storage userInfoList = _userInfosForDapp[publicKey];
        for (uint i = 0; i < userInfoList.length; i++) {
            UserInfo memory tempUserInfo = userInfoList[i];
            if (tempUserInfo.userAddress == userAddress) {
                updateCheck = true;
                userInfoList[i].iv = iv;
                userInfoList[i].ephemPublicKey = ephemPublicKey;
                userInfoList[i].ciphertext = ciphertext;
                userInfoList[i].mac = mac;
                _userInfosForDapp[publicKey] = userInfoList;
                break;
            }
        }
        if (!updateCheck) {

            UserInfo memory newUserInfo;

            newUserInfo.userAddress = userAddress;
            newUserInfo.iv = iv;
            newUserInfo.ephemPublicKey = ephemPublicKey;
            newUserInfo.ciphertext = ciphertext;
            newUserInfo.mac = mac;

            userInfoList.push(newUserInfo);
            _userInfosForDapp[publicKey] = userInfoList;
        }
    }

    // -- 테스트시에 오버라이딩이 적용이 안되어서 함수를 하나더 만듬
    function updateIsProvidedFalseForDapp(string memory publicKey, bool isProvided) public {
        User storage tempUser = _userMap[msg.sender];
        require(tempUser.userAddress != address(0), "do not register User");

        for (uint i = 0; i < tempUser.useDapps.length; i++) {
            if (keccak256(abi.encodePacked(tempUser.useDapps[i].publicKey)) == keccak256(abi.encodePacked(publicKey))) {
                tempUser.useDapps[i].isProvided = isProvided;
                _userMap[msg.sender] = tempUser;
            }
        }
    }

    //
    //
    //  dapp 기능 (dapp 연관)
    //
    //

    struct Dapp {
        uint id;
        string publicKey;
        string name;
        string description;
        string icons;
        string url;
        bool isProvided;
    }

    uint indexForUseDapp;

    mapping(string => Dapp) internal _dappMap;

    struct UserInfo {
        address userAddress;
        string iv;                //Initialization vector (16 bytes)
        string ephemPublicKey;    //Ephemeral public key (65 bytes)
        string ciphertext;        //The result of encryption (variable size)
        string mac;               //Message authentication code (32 bytes)
    }

    mapping(string => UserInfo[]) internal _userInfosForDapp;

    // 기본 DAPP 등록
    function setDapp(string memory _publicKey, string memory _name, string memory _description, string memory _icons, string memory _url, bool _isProvided) private {
        Dapp storage tempDapp = _dappMap[_publicKey];
        tempDapp.id = indexForUseDapp++;
        tempDapp.publicKey = _publicKey;
        tempDapp.name = _name;
        tempDapp.description = _description;
        tempDapp.icons = _icons;
        tempDapp.url = _url;
        tempDapp.isProvided = _isProvided;
        _dappMap[_publicKey] = tempDapp;
    }

    // DAPP 조회
    function getDapp(string memory _publicKey) private view returns (Dapp memory dapp) {
        return _dappMap[_publicKey];
    }

    // DAPP 에서 자신들의 회원에 대해서 개인정보를 조회
    //    function findOneByUserAddressAndPublicKeyForUserInfo(address userAddress, string memory publicKey) public view returns (UserInfo memory userInfo){
    function findOneByUserAddressAndPublicKeyForUserInfo(address userAddr, string memory publicKey) public view returns (address userAddress, string memory iv, string memory ephemPublicKey, string memory ciphertext, string memory mac){
        User memory tempUser = _userMap[userAddr];
        require(tempUser.userAddress != address(0), "do not register User");

        for (uint i = 0; i < tempUser.useDapps.length; i++) {
            Dapp memory tempDapp = tempUser.useDapps[i];
            if (keccak256(abi.encodePacked(tempDapp.publicKey)) == keccak256(abi.encodePacked(publicKey))) {
                require(tempDapp.isProvided, "Do not provided For Dapp !!!");
            }
        }

        UserInfo[] memory userInfoList = _userInfosForDapp[publicKey];
        for (uint i = 0; i < userInfoList.length; i++) {
            UserInfo memory tempUserInfo = userInfoList[i];
            if (tempUserInfo.userAddress == userAddr) {
                userAddress = tempUserInfo.userAddress;
                iv = tempUserInfo.iv;
                ephemPublicKey = tempUserInfo.ephemPublicKey;
                ciphertext = tempUserInfo.ciphertext;
                mac = tempUserInfo.mac;
                return (userAddress, iv, ephemPublicKey, ciphertext, mac);
            }
        }
    }

    //
    //  본인인증 기능
    //  루니사인 앱 - random 문자열 또는 숫자 등록
    //  DAPP - 사용자 지갑 주소로 random 문자열 조회
    //

    mapping(address => string) internal _identityVerificationRandom;

    // 루니사인 앱 - random 문자열 또는 숫자 등록
    function registerIV(string memory randomStr) public {
        _identityVerificationRandom[msg.sender] = randomStr;
    }

    // DAPP - 사용자 지갑 주소로 random 문자열 조회
    function checkIV(address userAddress, string memory randomStr) public view returns (bool) {
        string memory ivRandomStr = _identityVerificationRandom[userAddress];
        return keccak256(abi.encodePacked(ivRandomStr)) == keccak256(abi.encodePacked(randomStr));
    }
}
