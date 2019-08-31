pragma solidity ^0.5.0;

// interface for token
/*contract ERC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}*/

// Auto Balancing Mobility
contract ABM{
    
    // ABMTT(auto balancing mobility test token) address
    //address tokenAddr = 0x9796833d40A3B129660fb1d067434922C9b13ed6;
    
    // owner of this contract
    address public owner;
    
    // map[companyName] = address of company
    mapping(address=>string) companies;
    
    // map[stationID] = # of bikes
    mapping(int=>int) bikes;
    
    // user rent timestamp (to calculate rent fee later)
    mapping(address=>int) rentTimes;
    
    constructor() public{
        // set owner
        owner = msg.sender;
        
        // register luniverse REOA owner account as administrator
        registerCompany("luniverseOwner", 0x7F9e54d53549ba46DbE32AB39Fd5feE3Fd7CBE78);
    }
    
    // only owner can execute a function
    modifier onlyOwner(){
        //require(msg.sender == owner);
        _;
    }
    
    // only owner or company execute a function
    modifier onlyOwnerOrCompany(){
        //bool isOwner = owner == msg.sender;
        //bool isCompany = (keccak256(abi.encodePacked(companies[msg.sender])) != keccak256(abi.encodePacked("")));
        //require(isOwner || isCompany);
        _;
    }
    
    function registerCompany(string memory companyName, address companyAddress) public onlyOwner {
        companies[companyAddress] = companyName;
    }
    
    // to know correct address format (= correct checksum address)
    function getAddress(address addr) public pure returns (address){
        return addr;
    }
    
    function deleteCompany(address companyAddress) public onlyOwner{
        delete companies[companyAddress];
    }
    
    function setBikeNum(int stationID, int bikeNum) public onlyOwnerOrCompany{
        bikes[stationID] = bikeNum;
    }
    
    function setBikeNums(int[] memory stationIDs, int[] memory bikeNums) public onlyOwnerOrCompany{
        require(stationIDs.length == bikeNums.length);
        for (uint i=0; i<stationIDs.length;i++){
            bikes[stationIDs[i]] = bikeNums[i];
        }
    }
    
    function getBikeNum(int stationID) public view returns (int) {
        return bikes[stationID];
    }
    
    function returnBike(int stationID) public returns (int) {
        // check a user rented a bikes
        require(rentTimes[msg.sender] != 0);
        
        // init rent time
        int rentTime = rentTimes[msg.sender];
        delete rentTimes[msg.sender];
        
        // increase # of bike
        bikes[stationID]++;
        
        // return rent time to calculate rent fee
        return rentTime;
    }
    
    function rentBike(int stationID, int rentTime) public{
        // need at least 1 bike to rent
        require(bikes[stationID] > 0);
        
        // do not rent more than 1 bike
        require(rentTimes[msg.sender] == 0);
        
        // save time stimestamp
        rentTimes[msg.sender] = rentTime;
        
        // decrease # of bike
        bikes[stationID]--;
    }
    
    // struct to get blocks from relayer
    struct FLBlockHeader{
        uint blockNumber;
        bytes32 prevBlockHash;
        bytes32 weightHash;
        bytes32 testSetHash;
    }
    
    FLBlockHeader[] public blocks;
    
    // insert block into blocks array
    function insertBlock(uint _blockNumber, bytes32 _prevBlockHash, bytes32 _weightHash, bytes32 _testSetHash) public onlyOwner{
        FLBlockHeader memory FLBlock = FLBlockHeader(_blockNumber, _prevBlockHash, _weightHash, _testSetHash);
        blocks.push(FLBlock);
    }
    
    // delete block from blocks array
    function deleteBlock(uint _blockNumber) public onlyOwner{
        delete blocks[_blockNumber];
    }
    
    // get block from blocks array
    function readBlock(uint _blockNumber) public view returns (uint, bytes32, bytes32, bytes32) {
        return (blocks[_blockNumber].blockNumber, blocks[_blockNumber].prevBlockHash, blocks[_blockNumber].weightHash, blocks[_blockNumber].testSetHash); 
    }
    
    function getBlocksLength()public view returns (uint){
        return blocks.length;
    }
    
    
    // model inference
    
    int[] nums;
    
    function insertNum(int num)public{
        nums.push(num);
    }
    
    function getNumsLen()public view returns(uint){
        return nums.length;
    }
    
    function getNum(uint index) public view returns (int){
        return nums[index];
    }
    
    function popNum() public {
        nums.pop(); // eliminate last inserted element
    }
    
    function deleteNum(uint index)public {
        delete nums[index]; // just change value as 0
    }
    
    // inference request
    struct infRequest{
        address addr;
        int reqTime;
        int[] stations; // station ID
        int[] arriveTimes; // arrive a station after x hours
        int[] infos; // month, temperature, windDirection, windSpeed, precipitation, humidity, day(0~6)
    }
    infRequest[] infReqs;
    
    // inference response
    struct infResponse{
        int[] stations;
        int[] bikeNums;
    }
    mapping(string=>infResponse) infResponses;
    
    // insert inference request to list
    function requestInference(int _reqTime, int[] memory _stations, int[] memory _arriveTimes, int[] memory _infos) public {
        infRequest memory req = infRequest(msg.sender, _reqTime, _stations, _arriveTimes, _infos);
        infReqs.push(req);
    }
    
    // for relayer, to get request from list
    function getRequest() public view returns (address, int, int[] memory, int[] memory, int[] memory) {
        // get latest request
        infRequest memory req = infReqs[infReqs.length-1];
        //infReqs.pop(); // due to this, cannot get return values. so move this into deleteRequest() function
        
        return (req.addr, req.reqTime, req.stations, req.arriveTimes, req.infos);
    }
    
    // for relayer, delete picked request
    function deleteRequest() public{
        infReqs.pop();
    }
    
    // for relayer, to insert inference result to list (requestID = fromAddr + requestTime)
    function insertResponse(string memory requestID, int[] memory _stations, int[] memory _bikeNums) public {
        infResponse memory res = infResponse(_stations, _bikeNums);
        infResponses[requestID] = res;
    }
    
    // read inference result (requestID = fromAddr + requestTime)
    function getResponse(string memory requestID) public view returns (int[] memory, int[] memory){
        return (infResponses[requestID].stations, infResponses[requestID].bikeNums);
    }
    
    
}









