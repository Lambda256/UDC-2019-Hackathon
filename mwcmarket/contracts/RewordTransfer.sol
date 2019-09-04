pragma solidity ^0.4.21;
//pragma experimental ABIEncoderV2;

contract RewordTransfer {
    event TraceBalance(uint _user, uint _company);
    
    function checkBalance(address _userId, address _companyId, uint _reword) public view returns (uint, uint) {
        //"_userId": "0xbfb07e725f66b2ac1187a5b134fbcf4a3f3beaf0",
		//"_companyId": "0x69f2d1bdc2430a3a067620f617fec3100b892d54",
        uint userbalance = address(_userId).balance;
        uint companybalance = address(_companyId).balance;
        
        emit TraceBalance(userbalance, companybalance);
        return (userbalance, companybalance);
    }
}
