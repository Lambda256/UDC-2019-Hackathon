pragma solidity ^0.4.21;
//pragma experimental ABIEncoderV2;

contract WorkStamp {
    struct StampEntry{
        address userId;
        uint entryKeyIndex;
        uint workStampIndex;
        uint yearMon;
        //uint day;
        //uint workCode;
        //uint workPlace;
        string day;
        string workCode;
        string workPlace;
        uint latitude;
        uint longitude;
        uint256 timestamp;
        //uint reword;

    }
    mapping(bytes32 => StampEntry) public entryMap;
    mapping(address => mapping(uint => mapping(uint => mapping(uint => bytes32)))) public workStampMap; 

    bytes32[] public entryKeyList; // key list of entryMap
    mapping(address => mapping(uint => mapping(uint => bytes32[]))) public workStampListMap; // User => key list of entryMap
    
    event StampCheck(uint workValues);
    
    function checkStamp(address _userId, uint _yearMon, uint _day, uint _workCode, 
                uint _latitude, uint _longitude, uint _workPlace) public {
                    
        require(!isChecked(_userId, _yearMon, _day, _workCode), "entry cannot be in map");

        bytes32 key = keccak256(abi.encodePacked(_userId, _yearMon, _day, _workCode));

        StampEntry storage entry = entryMap[key]; // entryMap
        entry.userId = _userId;
        entry.entryKeyIndex = entryKeyList.push(key) - 1; // entryKeyList
        entry.workStampIndex = workStampListMap[_userId][_yearMon][_day].push(key) - 1;
        entry.yearMon = _yearMon;
        
        //entry.day = _day;
        //entry.workCode = _workCode;
        //entry.workPlace = _workPlace;
        if(_day < 10) {
            entry.day = strConcat("0", toString(_day));
        } else {
            entry.day = toString(_day);
        }
        
        if(_workCode < 10) {
            entry.workCode = strConcat("0", toString(_workCode));
        } else {
            entry.workCode = toString(_workCode);
        }
        
        if(_workPlace < 10) {
            entry.workPlace = strConcat("0", toString(_workPlace));
        } else {
            entry.workPlace = toString(_workPlace);
        }
        
        entry.latitude = _latitude;
        entry.longitude = _longitude;
        entry.timestamp = block.timestamp;
        //entry.reword = _reword;
        
        workStampMap[_userId][_yearMon][_day][_workCode] = key; // userToCompanyMap
    }

    function discheckStamp(address _userId, uint _yearMon, uint _day, uint _workCode) public {
        require(isChecked(_userId, _yearMon, _day, _workCode), "entry must be present in map");

        bytes32 key = workStampMap[_userId][_yearMon][_day][_workCode];

        StampEntry storage entry = entryMap[key]; // entryMap

        // entryKeyList
        bytes32 lastKeyOfList = entryKeyList[entryKeyList.length - 1];
        entryMap[lastKeyOfList].entryKeyIndex = entry.entryKeyIndex;
        entryKeyList[entry.entryKeyIndex] = lastKeyOfList;
        entryKeyList.length--;

        // workStampListMap
        lastKeyOfList = workStampListMap[_userId][_yearMon][_day][workStampListMap[_userId][_yearMon][_day].length - 1];
        entryMap[lastKeyOfList].workStampIndex = entry.workStampIndex;
        workStampListMap[_userId][_yearMon][_day][entry.workStampIndex] = lastKeyOfList;
        workStampListMap[_userId][_yearMon][_day].length--;

        // delete from workStampMap
        delete workStampMap[_userId][_yearMon][_day][_workCode];

        // delete from entryMap
        delete entryMap[key];
    }

    function isChecked(address _userId, uint _yearMon, uint _day, uint _workCode) public view returns (bool) {
        return _isConnect(workStampMap[_userId][_yearMon][_day][_workCode]);
    }

    function getCheckedTotalCount() public view returns (uint){
        return entryKeyList.length;
    }

    function getCheckedStampCount(address _userId, uint _yearMon, uint _day) public view returns (uint){
        return workStampListMap[_userId][_yearMon][_day].length;
    }

    function _isConnect(bytes32 key) private pure returns (bool) {
        return key != 0;
    }
    
    event StampKey(bytes32 _key);
    
    function stampList(address _userId, uint _yearMon, uint _stday, uint _edday) 
            public view returns (uint[], uint256[]) {
        // 0xbfb07e725f66b2ac1187a5b134fbcf4a3f3beaf0
        uint len = stampCount(_userId, _yearMon, _stday, _edday);
        
        uint[] memory workValues = new uint[](len);
        //string[] memory workValues = new string[](len);
        uint256[] memory timestamps = new uint256[](len);
        
        uint count = 0;
        for (uint i = _stday; i <= _edday; i++) {
            for (uint j = 0; j < workStampListMap[_userId][_yearMon][i].length; j++) {
                bytes32 key = workStampListMap[_userId][_yearMon][i][j];
                //emit StampKey(key);
        
                StampEntry memory entry = entryMap[key];
                //if(entry.day.length = 1) 

                //workValues[count] = stringToUint(strConcat(toString(entry.day) ,toString(entry.workCode), toString(entry.workPlace)));
                //workValues[count] = strConcat(strConcat(toString(entry.yearMon), "-", toString(entry.day)),":",toString(entry.workCode),":",toString(entry.workPlace));
                workValues[count] = stringToUint(strConcat(toString(entry.yearMon), entry.day,entry.workCode,entry.workPlace));
                timestamps[count] = entry.timestamp;

                count++;
            }
        }
        return (workValues, timestamps);
    }
    
    function stampCount(address _userId, uint _yearMon, uint _stday, uint _edday) public view returns (uint) {
        uint cnt=0;
        for (uint i = _stday; i <= _edday; i++) {
            for (uint j = 0; j < workStampListMap[_userId][_yearMon][i].length; j++) {
                cnt++;
            }
        }
        return cnt;
    }
    
    event StampLogging(uint256[] workValues, uint[] workplace, uint[] _timestamp);
    event StampLogging(uint[] _timestamp);
    
    function stamp(address _userId, uint _yearMon, uint _stday, uint _edday) public payable {
            
        uint len = stampCount(_userId, _yearMon, _stday, _edday);
        
        uint256[] memory workValues = new uint256[](len);
        //uint[] memory workPlaces = new uint[](len);
        //uint[] memory latitudes = new uint[](len);
        //uint[] memory longitudes = new uint[](len);
        uint256[] memory timestamps = new uint256[](len);
        //uint[] memory rewords = new uint[](len);
        uint count = 0;
        for (uint i = _stday; i <= _edday; i++) {
            for (uint j = 0; j < workStampListMap[_userId][_yearMon][i].length; j++) {
                bytes32 key = workStampListMap[_userId][_yearMon][i][j];
                
                emit StampKey(key);
                
                StampEntry memory entry = entryMap[key];
                
                //workPlaces[count] = entry.workPlace;
                //latitudes[j] = entry.latitude;
                //longitudes[j] = entry.longitude;
                timestamps[count] = entry.timestamp;
                //rewords[j] = entry.reword;
                count++;
            }
        }
        
        emit StampLogging(timestamps);
    }

    function stringToUint(string s) internal pure returns (uint result) {
        bytes memory b = bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint c = uint(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }
    
    function strConcat(string _a, string _b, string _c, string _d, string _e) internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }
    
    function strConcat(string _a, string _b, string _c, string _d) internal returns (string) {
        return strConcat(_a, _b, _c, _d, "");
    }
    
    function strConcat(string _a, string _b, string _c) internal returns (string) {
        return strConcat(_a, _b, _c, "", "");
    }
    
    function strConcat(string _a, string _b) internal returns (string) {
        return strConcat(_a, _b, "", "", "");
    }
    
    function toString(uint _base)
        internal
        pure
        returns (string memory) {
        bytes memory _tmp = new bytes(32);
        uint i;
        for(i = 0;_base > 0;i++) {
            _tmp[i] = byte(uint8((_base % 10) + 48));
            _base /= 10;
        }
        bytes memory _real = new bytes(i--);
        for(uint j = 0; j < _real.length; j++) {
            _real[j] = _tmp[i--];
        }
        return string(_real);
    }
}
