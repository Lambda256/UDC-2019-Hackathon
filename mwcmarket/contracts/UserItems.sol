pragma solidity ^0.4.19;

contract UserItems {
    struct ItemEntry{
        address userId;
        uint entryKeyIndex;
        uint userItemIndex;
        uint itemId; //
        uint price;
        uint num;
        bool returnYn;
        uint256 timestamp;
    }
    mapping(bytes32 => ItemEntry) public entryMap;
    mapping(address => mapping(uint => bytes32)) public userItemMap; // User + ItemID => key of entryMap

    bytes32[] public entryKeyList; // key list of entryMap
    mapping(address => bytes32[]) public userItemListMap; // User => key list of entryMap

    function genKey(address _userId) public view returns (bytes32){
        uint nextNum = userItemListMap[_userId].length+1;
        bytes32 key = keccak256(abi.encodePacked(_userId, nextNum));
        return key;
    }

    function purchaseItem(address _userId, uint _itemId, uint _price) public {
        //Gabriel : 0x112d8b16ce8ea1b3027afc17500049a04e1aef98
        uint nextNum = userItemListMap[_userId].length+1;
        //require(!isPurchased(_userId,nextNum), "entry cannot be in map");

        bytes32 key = keccak256(abi.encodePacked(_userId, nextNum));

        ItemEntry storage entry = entryMap[key]; // entryMap
        entry.userId = _userId;
        entry.entryKeyIndex = entryKeyList.push(key) - 1; // entryKeyList
        entry.userItemIndex = userItemListMap[_userId].push(key) - 1; // userToCompanyListMap
        entry.itemId = _itemId;
        entry.num = nextNum;
        entry.price = _price;
        entry.timestamp = block.timestamp;
        entry.returnYn = false;

        userItemMap[_userId][nextNum] = key; // userToCompanyMap
    }

    function returnItem(address _userId, uint _num) public {
        //require(isPurchased(_userId, _num), "entry must be present in map");

        bytes32 key = userItemMap[_userId][_num];

        ItemEntry storage entry = entryMap[key]; // entryMap
        entry.returnYn = true;

    }

    function returnItemDel(address _userId, uint _num) public {
        //require(isPurchased(_userId, _num), "entry must be present in map");

        bytes32 key = userItemMap[_userId][_num];

        ItemEntry storage entry = entryMap[key]; // entryMap

        // entryKeyList
        bytes32 lastKeyOfList = entryKeyList[entryKeyList.length - 1];
        entryMap[lastKeyOfList].entryKeyIndex = entry.entryKeyIndex;
        entryKeyList[entry.entryKeyIndex] = lastKeyOfList;
        entryKeyList.length--;

        // userItemListMap
        lastKeyOfList = userItemListMap[_userId][userItemListMap[_userId].length - 1];
        entryMap[lastKeyOfList].userItemIndex = entry.userItemIndex;
        userItemListMap[_userId][entry.userItemIndex] = lastKeyOfList;
        userItemListMap[_userId].length--;

        // delete from userToCompanyMap
        delete userItemMap[_userId][_num];

        // delete from entryMap
        delete entryMap[key];
    }

    function isPurchased(address _userId, uint _nextNum) public view returns (bool) {
        //can buy one item many times. there is no checking
        return _isConnect(userItemMap[_userId][_nextNum]);
    }

    function purchaseCount(address _userId) public view returns (uint){
        return userItemListMap[_userId].length;
    }

    function _isConnect(bytes32 key) private pure returns (bool) {
        return key != 0;
    }

    function purchaseList(address _userId) public view returns (uint[], uint[], uint[], bool[], uint256[]) {
        //https://medium.com/coinmonks/solidity-tutorial-returning-structs-from-public-functions-e78e48efb378
        uint[] memory itemIds = new uint[](userItemListMap[_userId].length);
        uint[] memory prices = new uint[](userItemListMap[_userId].length);
        uint[] memory nums = new uint[](userItemListMap[_userId].length);
        bool[] memory returnYns = new bool[](userItemListMap[_userId].length);
        uint256[] memory timestamps = new uint256[](userItemListMap[_userId].length);

        for (uint i = 0; i < userItemListMap[_userId].length; i++) {
            bytes32 key = userItemListMap[_userId][i];
            ItemEntry storage entry = entryMap[key];
            itemIds[i] = entry.itemId;
            prices[i] = entry.price;
            nums[i] = entry.num;
            returnYns[i] = entry.returnYn;
            timestamps[i] = entry.timestamp;

        }

        return (itemIds, prices, nums, returnYns, timestamps);
    }
}
