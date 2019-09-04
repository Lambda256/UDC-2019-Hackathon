pragma solidity ^0.5.0;

import "@openzeppelin/contracts/access/roles/WhiteListAdminRole.sol";
import "./GiveToken.sol";

// Box의 관리자는 화이트 리스트로 등록된 여러 관리자를 둘 수 있다.
contract GiveBox is WhitelistAdminRole {

    struct Backer {
        uint16 id;
        string name;
        uint amount;
        uint date;
        bool applyTrooper;
        bool isTrooper;
        uint txid;
    }

    struct Project {
        uint16 id;
        string title;
        uint goal;
        uint fund;
        uint date;
        uint8 trooperSelect;
        uint8 trooperCount;
        uint16 backerCount;
        bool isClosed;
        bool isHidden;
        mapping (uint => Backer) backers;
    }

    address public tokenContract;   // 연동된 토큰 컨트랙트
    address public administrator;   //[TODO] 나중에 화이트리스트들로 수정

    uint16 projectCount = 0;
    uint   totalBalance = 0;        // 컨트랙트에 쌓여있는 토큰 수

    mapping (uint => Project) public projects;

    // -----------------------------------------------
    constructor () public {
        administrator = msg.sender;
    }

    function addProject(string memory title) public onlyWhitelistAdmin returns(uint id) {
        projects[projectCount] = Project(projectCount, title, 0, 0, now, 0, 0, 0, false, false);
        projectCount++;
        return projects[projectCount].id;
    }


    function getProject(uint16 projectId) public view returns(
        uint16 id, string memory title, uint goal, uint fund, uint date,
        uint8 trooperSelect, uint8 trooperCount, uint16 backerCount, bool isClosed, bool isHidden)
    {
        Project storage p = projects[projectId];
        return (p.id, p.title, p.goal, p.fund, p.date, p.trooperSelect, p.trooperCount, p.backerCount, p.isClosed, p.isHidden);
    }


    function editProjectTitle(uint16 projectId, string memory title) public onlyWhitelistAdmin {
        projects[projectId].title = title;
    }


    function give(uint16 projectId, string memory name, uint256 amount, bool applyTrooper) public returns (bool) {

        GiveToken token = GiveToken(tokenContract);
        token.transferFrom(msg.sender, address(this), amount);

        totalBalance += amount;

        Project storage p = projects[projectId];

        p.fund += amount;

        p.backers[p.backerCount] = Backer(p.backerCount, name, amount, now, applyTrooper, false, 0);
        p.backerCount++;

        if (applyTrooper == true) {
            p.trooperCount++;
        }

        return true;
    }

    function getBackers(uint16 projectId) public view returns (
        uint[] memory, uint[] memory, uint[] memory, uint[] memory,
        bool[] memory, bool[] memory, bytes memory) {

        Project storage p = projects[projectId];

        uint[] memory id     = new uint[](p.backerCount);
        uint[] memory amount = new uint[](p.backerCount);
        uint[] memory date   = new uint[](p.backerCount);
        uint[] memory txid   = new uint[](p.backerCount);
        bool[] memory applyTrooper = new bool[](p.backerCount);
        bool[] memory isTrooper    = new bool[](p.backerCount);
        bytes  memory nameBuffer   = new bytes(64*p.backerCount);

        uint offset = 64 * p.backerCount;

        for (uint16 i = 0; i < p.backerCount; i++) {
            Backer storage backer = p.backers[i];

            id[i]     = backer.id;
            amount[i] = backer.amount;
            date[i]   = backer.date;
            txid[i]   = backer.txid;

            applyTrooper[i] = backer.applyTrooper;
            isTrooper[i]    = backer.isTrooper;

            stringToBytes(offset, bytes(backer.name), nameBuffer);
            offset -= sizeOfString(backer.name);
        }

        return (id, amount, date, txid, applyTrooper, isTrooper, nameBuffer);
    }


    // --- 완성된 거 -----
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



