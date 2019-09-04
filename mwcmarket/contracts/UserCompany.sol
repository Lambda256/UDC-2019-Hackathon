pragma solidity ^0.4.19;

contract UserCompany {
    struct UserCompanyEntry{
        address userId;
        address companyId;
        uint entryKeyIndex;
        uint userToCompanyIndex;
        uint companyToUserIndex;
    }
    mapping(bytes32 => UserCompanyEntry) public entryMap;
    mapping(address => mapping(address => bytes32)) public userToCompanyMap; // User + Company => key of entryMap

    bytes32[] public entryKeyList; // key list of entryMap
    mapping(address => bytes32[]) public userToCompanyListMap; // User => key list of entryMap
    mapping(address => bytes32[]) public companyToUserListMap; // Company => key list of entryMap


    function addCompanyUser(address _userId, address _companyId) public {
        require(!isConnect(_userId,_companyId), "entry cannot be in map");

        bytes32 key = keccak256(abi.encodePacked(_userId, _companyId));

        UserCompanyEntry storage entry = entryMap[key]; // entryMap
        entry.userId = _userId;
        entry.companyId = _companyId;
        entry.entryKeyIndex = entryKeyList.push(key) - 1; // entryKeyList
        entry.userToCompanyIndex = userToCompanyListMap[_userId].push(key) - 1; // userToCompanyListMap
        entry.companyToUserIndex = companyToUserListMap[_companyId].push(key) - 1; // companyToUserListMap

        userToCompanyMap[_userId][_companyId] = key; // userToCompanyMap
    }

    function delCompanyUser(address _userId, address _companyId) public {
        require(isConnect(_userId,_companyId), "entry must be present in map");

        bytes32 key = userToCompanyMap[_userId][_companyId];

        UserCompanyEntry storage entry = entryMap[key]; // entryMap

        // entryKeyList
        bytes32 lastKeyOfList = entryKeyList[entryKeyList.length - 1];
        entryMap[lastKeyOfList].entryKeyIndex = entry.entryKeyIndex;
        entryKeyList[entry.entryKeyIndex] = lastKeyOfList;
        entryKeyList.length--;

        // userToCompanyListMap
        lastKeyOfList = userToCompanyListMap[_userId][userToCompanyListMap[_userId].length - 1];
        entryMap[lastKeyOfList].userToCompanyIndex = entry.userToCompanyIndex;
        userToCompanyListMap[_userId][entry.userToCompanyIndex] = lastKeyOfList;
        userToCompanyListMap[_userId].length--;

        // companyToUserListMap
        lastKeyOfList = companyToUserListMap[_companyId][companyToUserListMap[_companyId].length - 1];
        entryMap[lastKeyOfList].companyToUserIndex = entry.companyToUserIndex;
        companyToUserListMap[_companyId][entry.companyToUserIndex] = lastKeyOfList;
        companyToUserListMap[_companyId].length--;

        // delete from userToCompanyMap
        delete userToCompanyMap[_userId][_companyId];

        // delete from entryMap
        delete entryMap[key];
    }

    function isConnect(address _userId, address _companyId) public view returns (bool) {
        return _isConnect(userToCompanyMap[_userId][_companyId]);
    }

    function getConnectedTotalCount() public view returns (uint){
        return entryKeyList.length;
    }

    function getConnectedCompanyCount(address _userId) public view returns (uint){
        return userToCompanyListMap[_userId].length;
    }

    function getConnectedCompanyId(address _userId, uint index) public view returns (address){
        bytes32 key = userToCompanyListMap[_userId][index];
        require(_isConnect(key), "entry must be present in map");

        UserCompanyEntry storage entry = entryMap[key];
        return entry.companyId;
    }

    function getConnectedUserCount(address _companyId) public view returns (uint){
        return companyToUserListMap[_companyId].length;
    }

    function getConnectedUserId(address _companyId, uint index) public view returns (address){
        bytes32 key = companyToUserListMap[_companyId][index];
        require(_isConnect(key), "entry must be present in map");

        UserCompanyEntry storage entry = entryMap[key];
        return entry.userId;
    }

    function companyUserList(address _companyId) public view returns (address[]){

        address[] memory addrs = new address[](companyToUserListMap[_companyId].length);
        for (uint i = 0; i < companyToUserListMap[_companyId].length; i++) {
            bytes32 key = companyToUserListMap[_companyId][i];
            UserCompanyEntry storage entry = entryMap[key];
            addrs[i] = entry.userId;
        }

        return addrs;
    }

    function _isConnect(bytes32 key) private pure returns (bool) {
        return key != 0;
    }
}
