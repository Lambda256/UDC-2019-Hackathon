pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/access/roles/WhiteListAdminRole.sol";

contract GiveToken is ERC20, ERC20Detailed, ERC20Mintable, WhitelistAdminRole {

    // 아래 private 에서 internal로 바꿈 (ERC20.sol)
    //mapping (address => uint256) internal _balances;
    //mapping (address => mapping (address => uint256)) internal _allowances;

    constructor () public ERC20Detailed("Give Token", "GIV", 18) {

        uint32 initSupply = 10000;

        _mint(msg.sender, initSupply * (10 ** uint256(decimals())));
    }

    function transferFrom(address from, address to, uint amount) public returns (bool success) {

        require(amount <= _balances[from]);

		_balances[from] = _balances[from].sub(amount);
		_balances[to]   = _balances[to].add(amount);

        if (isWhitelistAdmin(msg.sender) == false) {
            _allowances[from][msg.sender] = _allowances[from][msg.sender].sub(amount);
        }

		emit Transfer(from, to, amount);

		return true;
	}

}
