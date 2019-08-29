 solidity ^0.5.0;

// Auto Balancing Mobility
contract ABM{
    
    // owner of this contract
    address public owner;
    
    // map[companyName] = address of company
    mapping(address=>string) companies;
    
    // map[stationID] = # of bikes
    mapping(int=>int) bikes;
    
    constructor() public{
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
        bool isOwner = owner == msg.sender;
        bool isCompany = (keccak256(abi.encodePacked(companies[msg.sender])) != keccak256(abi.encodePacked("")));
        require(isOwner || isCompany);
        _;
    }
    
    function registerCompany(string memory companyName, address companyAddress) public onlyOwner {
        companies[companyAddress] = companyName;
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
    
    // struct to get blocks from relayer
    struct FLBlockHeader{
        uint blockNumber;
        bytes32 prevBlockHash;
        bytes32 weightHash;
        bytes32 testSetHash;
    }
    
    FLBlockHeader[] blocks;
    
    // insert block into blocks array
    function insertBlock(uint _blockNumber, bytes32 _prevBlockHash, bytes32 _weightHash, bytes32 _testSetHash) public onlyOwner{
        FLBlockHeader memory FLBlock = FLBlockHeader(_blockNumber, _prevBlockHash, _weightHash, _testSetHash);
        blocks[_blockNumber] = FLBlock;
    }
    
    // delete block from blocks array
    function deleteBlock(uint _blockNumber) public onlyOwner{
        delete blocks[_blockNumber];
    }
    
    // get block from blocks array
    function readBlock(uint _blockNumber) public view returns (uint, bytes32, bytes32, bytes32) {
        return (blocks[_blockNumber].blockNumber, blocks[_blockNumber].prevBlockHash, blocks[_blockNumber].weightHash, blocks[_blockNumber].testSetHash); 
    }
    
}









