pragma solidity ^0.5.0;

contract ERC20 {
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address _from, address to, uint tokens) public returns (bool success);
    event Transfer(address indexed _from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}


// Auto Balancing Mobility
contract ABM{
    
    // address of ABMTT token
    address tokenAddr = 0x9796833d40A3B129660fb1d067434922C9b13ed6;
    
    // ABM token
    ERC20 ABMtoken = ERC20(tokenAddr);
    
    // address of luniverse REOA owner account
    address REOAowner = 0x7F9e54d53549ba46DbE32AB39Fd5feE3Fd7CBE78;
    
    // owner of this contract
    address public owner;
    
    // map[companyName] = address of company
    mapping(address=>string) companies;
    
    // map[stationID] = # of bikes
    mapping(int=>int) bikes;
    
    // user rent timestamp (to calculate rent fee later)
    mapping(address=>uint) rentTimes;
    
    // bike return info to calculate return incentive
    struct returnInfo{
        int stationID;
        int bikeNumAfterReturn;
        uint useTime;
    }
    
    mapping(address=>returnInfo) returnInfos;
    
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
    
    function returnBike(int stationID, uint returnTime) public {
        // check a user rented a bikes
        require(rentTimes[msg.sender] != 0);
        
        // calculate use time
        uint useTime = returnTime - rentTimes[msg.sender];
        
        // pay additional rent fee
        ABMtoken.transferFrom(msg.sender, REOAowner, useTime);
        
        // init rent time
        delete rentTimes[msg.sender];
        
        // increase # of bike
        bikes[stationID]++;
        
        // update return info to calculate incentive later
        returnInfo memory ri = returnInfo(stationID, bikes[stationID], useTime);
        returnInfos[msg.sender] = ri;
        
    }
    
    function rentBike(int stationID, uint rentTime) public{
        // need at least 1 bike to rent
        require(bikes[stationID] > 0);
        
        // do not rent more than 1 bike
        require(rentTimes[msg.sender] == 0);
        
        // pay rent fee (user should execute approve(this contract address, 5) at sideToken contract first)
        ABMtoken.transferFrom(msg.sender, REOAowner, 5);
        
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
    
    
    
    //
    // model inference
    //
    
    // inference request
    struct infRequest{
        // for request id
        address addr;
        int reqTime;
        
        // inference data
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
    
    // map[address] = amount of incentive that this user can get
    mapping(address=>int) incentives;
    
    function withdrawIncentive() public {
        delete incentives[msg.sender];
    }
    
    
    
    
    
    // token funcitons
    
    // need to execute token.approve(msg.sender, 10) first
    function sendToken() public {
        ERC20 token = ERC20(tokenAddr);
        token.transferFrom(0x7F9e54d53549ba46DbE32AB39Fd5feE3Fd7CBE78, msg.sender, 10);
    }
    
    function sendTokenTo(address _to) public {
        ERC20 token = ERC20(tokenAddr);
        token.transferFrom(0x7F9e54d53549ba46DbE32AB39Fd5feE3Fd7CBE78, _to, 10);
    }
    
    function sendTokenFromTo(address _from, address _to) public{
        ERC20 token = ERC20(tokenAddr);
        token.transferFrom(_from, _to, 10);
    }
    
    function transferToken(address to) public {
        ERC20 token = ERC20(tokenAddr);
        token.transfer(to, 10);
    }
    
    function balanceOf() public view returns (uint) {
        ERC20 token = ERC20(tokenAddr);
        return token.balanceOf(msg.sender);
    }
    
    
}









