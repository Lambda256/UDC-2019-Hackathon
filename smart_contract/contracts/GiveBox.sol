pragma solidity ^0.5.0;

import "@openzeppelin/contracts/access/roles/WhiteListAdminRole.sol";
import "./GiveToken.sol";

// Box의 관리자는 화이트 리스트로 등록된 여러 관리자를 둘 수 있다.
contract GiveBox is WhitelistAdminRole {

    struct Review {
        uint16 id;
        string author;
        string content;
        address sender;
        uint date;
    }

    struct Backer {
        uint16  id;
        string  name;
        uint    amount;
        uint    date;
        bool    applyTrooper;
        bool    isTrooper;
        bool    voted;
        uint    blockNumber;
        address addr;
    }

    struct Project {
        uint16 id;
        string title;
        uint   goal;
        uint   fund;
        uint   date;
        uint8  trooperSelect;
        uint8  trooperCount;

        uint16 backerCount;
        uint8 reviewCount;

        string content;

        bool isClosed;
        mapping (uint => Backer) backers;
        mapping (uint => Review) reviews;
        mapping (address => uint) backLink;
    }

    struct ProjectClosing {
        uint id;
        uint16 acceptCount;
        uint16 claimCount;
        string content;
        address withdraw;
    }

    address public tokenContract;   // 연동된 토큰 컨트랙트
    address public administrator;   // [TODO] 나중에 화이트리스트들로 수정

    uint16 public projectCount = 0;
    uint   public totalBalance = 0;        // 컨트랙트에 쌓여있는 토큰 수

    mapping (uint => Project) public projects;
    mapping (uint => ProjectClosing) public projectCloses;

    // -----------------------------------------------
    constructor () public {
        administrator = msg.sender;
    }

    // 프로젝트 추가
    function addProject(string memory title) public onlyWhitelistAdmin returns(uint id) {
        projects[projectCount] = Project(projectCount, title, 0, 0, now, 0, 0, 0, 0, '', false);
        projectCloses[projectCount] = ProjectClosing(projectCount, 0, 0, '', address(0));
        projectCount++;

        return projects[projectCount].id;
    }

    // 프로젝트 상태값 가져오기
    function getProject(uint16 projectId) public view returns(
        uint16 id, string memory title, uint goal, uint fund, uint date,
        uint8 trooperSelect, uint8 trooperCount, uint16 backerCount, uint8 reviewCount, bool isClosed)
    {
        Project storage p = projects[projectId];
        return (p.id, p.title, p.goal, p.fund, p.date, p.trooperSelect, p.trooperCount, p.backerCount, p.reviewCount, p.isClosed);
    }

    // 본문 가져오기
    function getProjectContent(uint16 projectId) public view returns(string memory content) {
        Project storage p = projects[projectId];
        return (p.content);
    }

    // 프로젝트 내용 변경
    function editProjectContent(uint16 projectId, string memory title, string memory content) public onlyWhitelistAdmin {
        projects[projectId].title = title;
        projects[projectId].content = content;
    }

    // 프로젝트 옵션 변경
    function editProjectOptions(uint16 projectId, uint goal, uint date, uint8 trooperSelect) public onlyWhitelistAdmin {
        projects[projectId].goal = goal;
        projects[projectId].date = date;
        projects[projectId].trooperSelect = trooperSelect;
    }

    // 기부 트랜젝션
    function give(uint16 projectId, string memory name, uint256 amount, bool applyTrooper) public returns (bool) {

        // 기부토큰에서 기부만큼 차감시킴.
        GiveToken token = GiveToken(tokenContract);
        token.transferFrom(msg.sender, address(this), amount);

        totalBalance += amount;

        // 프로젝트에 내용 반영.
        Project storage p = projects[projectId];

        p.fund += amount;

        p.backers[p.backerCount] = Backer(p.backerCount, name, amount, now, applyTrooper, false, false, block.number, msg.sender);
        p.backLink[msg.sender] = p.backerCount;

        p.backerCount++;

        if (applyTrooper == true) {
            p.trooperCount++;
        }

        return true;
    }

    function vote(uint16 projectId, bool isAccept) public {

        Project storage p = projects[projectId];
        uint backNum = p.backLink[msg.sender];
        Backer storage backer = p.backers[backNum];

        if (backer.voted) return;

        backer.voted = true;

        if (isAccept == true)
            projectCloses[projectId].acceptCount++;
        else
            projectCloses[projectId].claimCount++;

    }

    function isBackerVoted(uint16 projectId, address backerAddr) public view returns (bool voted) {

        Project storage p = projects[projectId];
        uint backNum = p.backLink[backerAddr];
        Backer storage backer = p.backers[backNum];

        return backer.voted;
    }

    function getBackersAddrs(uint16 projectId) public view returns (address[] memory addr, uint[] memory blockNumber) {

        Project storage p = projects[projectId];

        address[] memory bArray = new address[](p.backerCount);
        uint[] memory uArray = new uint[](p.backerCount);

        for (uint i = 0; i < p.backerCount; i++) {
            bArray[i] = p.backers[i].addr;
            uArray[i] = p.backers[i].blockNumber;
        }

        return (bArray,uArray);
    }

    function withdraw(uint16 projectId, string memory content, address receiver) public onlyWhitelistAdmin {
        GiveToken token = GiveToken(tokenContract);

        Project memory p = projects[projectId];
        token.transfer(receiver, p.fund);

        projectCloses[projectId].withdraw = receiver;
        projectCloses[projectId].content  = content;        
    }

    function addReview(uint16 projectId, string memory author, string memory content ) public onlyWhitelistAdmin {
        Project storage p = projects[projectId];
        p.reviews[p.reviewCount] = Review(p.reviewCount, author, content, msg.sender, block.timestamp);
        p.reviewCount++;
    }

    function getClosing(uint16 projectId) public view returns
        (uint id, uint16 acceptCount, uint16 claimCount, string memory content, address withdrawAddr) {

        ProjectClosing memory p = projectCloses[projectId];

        return (p.id, p.acceptCount, p.claimCount, p.content, p.withdraw);
    }

    function getReview(uint16 projectId, uint16 reviewId) public view returns (
        uint16 id, string memory author, string memory content, address sender, uint date)
    {
        Review memory r = projects[projectId].reviews[reviewId];

        return (r.id, r.author, r.content, r.sender, r.date);
    }

    function getBackers(uint16 projectId) public view returns (
        uint[] memory, uint[] memory, uint[] memory, uint[] memory,
        bool[] memory, bool[] memory, bytes memory) {

        Project storage p = projects[projectId];

        uint[] memory _id     = new uint[](p.backerCount);
        uint[] memory _amount = new uint[](p.backerCount);
        uint[] memory _date   = new uint[](p.backerCount);
        uint[] memory _blockNumber  = new uint[](p.backerCount);
        bool[] memory _applyTrooper = new bool[](p.backerCount);
        bool[] memory _isTrooper    = new bool[](p.backerCount);        
        bytes  memory nameBuffer   = new bytes(64*p.backerCount);

        uint offset = 64 * p.backerCount;

        for (uint16 i = 0; i < p.backerCount; i++) {
            Backer storage backer = p.backers[i];

            _id[i]     = backer.id;
            _amount[i] = backer.amount;
            _date[i]   = backer.date;
            _blockNumber[i]  = backer.blockNumber;

            _applyTrooper[i] = backer.applyTrooper;
            _isTrooper[i]    = backer.isTrooper;

            stringToBytes(offset, bytes(backer.name), nameBuffer);
            offset -= sizeOfString(backer.name);
        }

        return (_id, _amount, _date, _blockNumber, _applyTrooper, _isTrooper, nameBuffer);
    }

    // 토큰주소 바인딩    
    function setToken(address _tokenContract) public onlyWhitelistAdmin {
        tokenContract = _tokenContract;
    }


    // 바이트 어레이용 함수
    // From https://github.com/pouladzade/Seriality
    function stringToBytes(uint _offst, bytes memory _input, bytes memory _output) internal pure {
        uint256 stack_size = _input.length / 32;
        if(_input.length % 32 > 0) stack_size++;

        assembly {
            stack_size := add(stack_size,1)//adding because of 32 first bytes memory as the length
            for { let index := 0 } lt(index,stack_size){ index := add(index ,1) } {
                mstore(add(_output, _offst), mload(add(_input,mul(index,32))))
                _offst := sub(_offst , 32)
            }
        }
    }

    function sizeOfString(string memory _in) internal pure  returns(uint _size){
        _size = bytes(_in).length / 32;
         if(bytes(_in).length % 32 != 0)  _size++;
        _size++; // first 32 bytes is reserved for the size of the string
        _size *= 32;
    }

    // End of Seriality --------------------------------

}



