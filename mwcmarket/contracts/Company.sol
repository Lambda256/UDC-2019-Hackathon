pragma solidity ^0.4.19;

contract Company {
    struct CompanyEntry{
        uint index;
        string name;
        string location;
        uint latitude;
        uint longitude;
        bool useYn;
    }
    mapping(address => CompanyEntry) public companyMap;
    address[] public companyList;

    function addCompany(address _companyId, string memory _name, string _location, uint _latitude, uint _longitude) public {
        CompanyEntry storage entry = companyMap[_companyId];
        require(!_contains(entry), "companyId cannot be in map");

        entry.index = companyList.push(_companyId) - 1;
        entry.name = _name;
        entry.location = _location;
        entry.latitude = _latitude;
        entry.longitude = _longitude;
        
        entry.useYn = true; //used
    }

    function updateCompany(address _companyId, string memory _name, string _location, uint _latitude, uint _longitude)  public {
        CompanyEntry storage entry = companyMap[_companyId];
        require(_contains(entry), "companyId not exist in map");

        //entry.index = companyList.push(_companyId) - 1;
        entry.name = _name;
        entry.location = _location;
        entry.latitude = _latitude;
        entry.longitude = _longitude;
    }
    
    function disableCompany(address _companyId) public {
        CompanyEntry storage entry = companyMap[_companyId];
        require(_contains(entry), "companyId not exist in map");

        entry.useYn = false;
    }
    
    function enableCompany(address _companyId) public {
        CompanyEntry storage entry = companyMap[_companyId];
        require(_contains(entry), "companyId not exist in map");

        entry.useYn = true;
    }
    
    function delCompany(address _companyId) public {
        CompanyEntry storage entry = companyMap[_companyId];
        require(_contains(entry), "companyId must be present in map");
        require(_isInRange(entry.index), "index must be in range");
        uint256 deleteEntryIndex = entry.index;

        // Move last element into the delete key slot.
        uint256 lastEntryIndex = companyList.length - 1;
        address lastEntryCompanyId = companyList[lastEntryIndex];
        companyMap[lastEntryCompanyId].index = deleteEntryIndex; // companyMap
        companyList[deleteEntryIndex] = companyList[lastEntryIndex]; // companyList
        companyList.length--;
        delete companyMap[_companyId];
    }
    
    function getCompanyInfo(address _companyId) public view returns (address companyId, string name, 
            string location, uint latitude, uint longitude, bool useYn) {
        CompanyEntry storage entry = companyMap[_companyId];
        require(_contains(entry), "companyId must be present in map");

        return (_companyId, entry.name, entry.location, entry.latitude, entry.longitude, entry.useYn);
    }

    function getByIndex(uint _index) public view returns (address companyId, string name, 
            string location, uint latitude, uint longitude, bool useYn) {
        require(_isInRange(_index), "index must be in range");

        return getCompanyInfo(companyList[_index]);
    }

    function size() public view returns (uint) {
        return companyList.length;
    }

    function contains(address _companyId) public view returns (bool) {
        CompanyEntry storage entry = companyMap[_companyId];
        return _contains(entry);
    }

    function _contains(CompanyEntry memory _entry) private pure returns (bool){
        return bytes(_entry.name).length > 0;
    }

    function _isInRange(uint256 _index) private view returns (bool) {
        return (_index >= 0) && (_index < companyList.length);
    }
    
}
