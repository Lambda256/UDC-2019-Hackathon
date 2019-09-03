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
    
    
    
    
    
    //
    // bike rent/return functions
    //
    
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
    
    // save user's bike return info
    mapping(address=>returnInfo) returnInfos;
    
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
        require(returnTime > rentTimes[msg.sender]);
        uint useTime = returnTime - rentTimes[msg.sender];
        
        // pay additional rent fee
        uint additionalRentFee = useTime;
        ABMtoken.transferFrom(msg.sender, REOAowner, additionalRentFee);
        
        // init rent time
        delete rentTimes[msg.sender];
        
        // increase # of bike
        bikes[stationID]++;
        
        // update return info to calculate incentive later
        returnInfo memory ri = returnInfo(stationID, bikes[stationID], useTime);
        returnInfos[msg.sender] = ri;
        
        // save record
        insertRecord(msg.sender, 1, additionalRentFee, returnTime);
    }
    
    function rentBike(int stationID, uint rentTime) public{
        // need at least 1 bike to rent
        require(bikes[stationID] > 0);
        
        // do not rent more than 1 bike
        require(rentTimes[msg.sender] == 0);
        
        // pay default rent fee (user should execute approve(this contract address, 5) at sideToken contract first)
        uint defaultRentFee = 5;
        ABMtoken.transferFrom(msg.sender, REOAowner, defaultRentFee);
        
        // save rent timestamp
        rentTimes[msg.sender] = rentTime;
        
        // decrease # of bike
        bikes[stationID]--;
        
        // save record
        insertRecord(msg.sender, 0, defaultRentFee, rentTime);
    }
    
    
    
    
    
    //
    // functions for relayed blocks
    //
    
    // struct to get blocks from relayer
    struct FLBlockHeader{
        uint blockNumber;
        bytes32 prevBlockHash;
        bytes32 weightHash;
        bytes32 testSetHash;
        bytes32 participantHash;
        int64 timestamp;
    }
    
    FLBlockHeader[] public blocks;
    
    // insert block into blocks array
    function insertBlock(uint _blockNumber, bytes32 _prevBlockHash, bytes32 _weightHash, bytes32 _testSetHash, bytes32 _participantHash, int64 _timestamp) public onlyOwner{
        FLBlockHeader memory FLBlock = FLBlockHeader(_blockNumber, _prevBlockHash, _weightHash, _testSetHash, _participantHash, _timestamp);
        blocks.push(FLBlock);
    }
    
    // delete all block from blocks array
    function resetBlocks() public onlyOwner{
        uint blocksLength = blocks.length;
        for(uint i=0;i<blocksLength;i++){
            blocks.pop();
        }
    }
    
    // get block from blocks array
    function readBlock(uint _blockNumber) public view returns (uint, bytes32, bytes32, bytes32, bytes32, int64) {
        return (blocks[_blockNumber].blockNumber, blocks[_blockNumber].prevBlockHash, blocks[_blockNumber].weightHash, blocks[_blockNumber].testSetHash, blocks[_blockNumber].participantHash, blocks[_blockNumber].timestamp); 
    }
    
    function getBlocksLength()public view returns (uint){
        return blocks.length;
    }
    
    
    
    
    
    //
    // ML model inference
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
    
    // pop latest inference request
    function popRequest() public{
        infReqs.pop();
    }
    
    // get # of inference requests
    function getRequestLength() public view returns (uint){
        return infReqs.length;
    }
    
    // for relayer, delete latest request
    function deleteRequest() public{
        infReqs.pop();
    }
    
    // for relayer, to insert inference result to list (requestID = fromAddr + requestTime)
    function insertResponse(string memory requestID, int[] memory _stations, int[] memory _bikeNums) public {
        infResponse memory res = infResponse(_stations, _bikeNums);
        infResponses[requestID] = res;
    }
    
    // read inference result (requestID = fromAddr + requestTime)
    function getResponse(string memory requestID) public view returns (int[] memory, int[] memory, int[] memory){
        
        // inf response should be exist
        require(infResponses[requestID].stations.length > 0);
        
        // incentive prediction
        int[] memory predictedIncentives = new int[](infResponses[requestID].stations.length);
        for(uint i=0; i<infResponses[requestID].stations.length; i++){
            int predictedBikeNum = infResponses[requestID].bikeNums[i];
            int currentBikeNum = bikes[infResponses[requestID].stations[i]];
            int diff;
            
            // can get incentive for this station
            if(predictedBikeNum > currentBikeNum){
                diff = predictedBikeNum - currentBikeNum;
            }
            // cannot get incentive for this station
            else{
                diff = 0;
            }
            
            // incentive function: bikeNumDiff * 10
            predictedIncentives[i] = diff * 10;
        }
        
        return (infResponses[requestID].stations, infResponses[requestID].bikeNums, predictedIncentives);
    }
    
    // get user's return info for relayer to calculate incentive
    function getReturnInfo(address addr) public view returns(int, int, uint){
        return (returnInfos[addr].stationID, returnInfos[addr].bikeNumAfterReturn, returnInfos[addr].useTime);
    }
    
    // relayer gives incentive to receiver
    function giveIncentive(address receiver, uint amount, uint timestamp) public{
        if(amount > 0){
            ABMtoken.transferFrom(REOAowner, receiver, amount);
        }
        
        // save record
        insertRecord(receiver, 2, amount, timestamp);
    }
    
    
    
    
    
    //
    // token funcitons
    //
    
    function balanceOf() public view returns (uint) {
        ERC20 token = ERC20(tokenAddr);
        return token.balanceOf(msg.sender);
    }
    
    
    
    
    
    //
    // users' pay/paid record
    //
    
    struct payRecord{
        int payType; // 0: default rent fee, 1: additional rent fee, 2: return incentive
        uint amount;
        uint timestamp;
    }
    
    mapping(address=>payRecord[]) payRecords;
    
    function insertRecord(address addr, int _payType, uint _amount, uint _timestamp)public{
        payRecord memory pr = payRecord(_payType, _amount, _timestamp);
        payRecords[addr].push(pr);
    }
    
    function getRecord(address addr) public view returns (int[] memory, uint[] memory, uint[] memory){
        
        uint recordLength = payRecords[addr].length;
        int[] memory payTypes = new int[](recordLength);
        uint[] memory amounts = new uint[](recordLength);
        uint[] memory timestamps = new uint[](recordLength);
        
        for(uint i=0; i<recordLength; i++){
            payRecord memory pr = payRecords[addr][i];
            payTypes[i] = pr.payType;
            amounts[i] = pr.amount;
            timestamps[i] = pr.timestamp;
        }
        
       return (payTypes, amounts, timestamps);
    }
    
    
    
    
    
    //
    // reset everything
    //
    
    /*function resetAll() public {
        
        // solidity has no reset functions...
        
    }*/
    
    
    
    
    
}





