pragma solidity ^0.4.18;

// Auto Balancing Mobility
contract ABM{
    
    // owner of this contract
    address public owner;
    
    // map[companyName] = address of company
    mapping(address=>string) companies;
    
    // map[stationID] = # of bikes
    mapping(int=>int) bikes;
    
    function ABM() public{
        // set owner
        owner = msg.sender;
    }
    
    // only owner can execute a function
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    
    // only owner or company execute a function
    modifier onlyOwnerOrCompany(){
        bool isOwner = keccak256(owner) == keccak256(msg.sender);
        bool isCompany = (keccak256(companies[msg.sender]) != keccak256(""));
        require(isOwner || isCompany);
        _;
    }
    
    function registerCompany(string companyName) public onlyOwner {
        companies[msg.sender] = companyName;
    }
    
    function deleteCompany(address companyAddress) public onlyOwner{
        delete companies[companyAddress];
    }
    
    function setBikeNum(int stationID, int bikeNum) public onlyOwnerOrCompany{
        bikes[stationID] = bikeNum;
    }
    
    function getBikeNum(int stationID) public view returns (int) {
        return bikes[stationID];
    }
    
    function returnBike(int stationID) public{
        bikes[stationID]++;
    }
    
    function rentBike(int stationID) public{
        // need at least 1 bike to rent
        require(bikes[stationID] > 0);
        
        bikes[stationID]--;
    }
    
}
