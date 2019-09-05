
// File: node_modules\@openzeppelin\contracts\access\Roles.sol

pragma solidity ^0.5.0;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
    struct Role {
        mapping (address => bool) bearer;
    }

    /**
     * @dev Give an account access to this role.
     */
    function add(Role storage role, address account) internal {
        require(!has(role, account), "Roles: account already has role");
        role.bearer[account] = true;
    }

    /**
     * @dev Remove an account's access to this role.
     */
    function remove(Role storage role, address account) internal {
        require(has(role, account), "Roles: account does not have role");
        role.bearer[account] = false;
    }

    /**
     * @dev Check if an account has this role.
     * @return bool
     */
    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0), "Roles: account is the zero address");
        return role.bearer[account];
    }
}

// File: @openzeppelin\contracts\access\roles\WhiteListAdminRole.sol

pragma solidity ^0.5.0;


/**
 * @title WhitelistAdminRole
 * @dev WhitelistAdmins are responsible for assigning and removing Whitelisted accounts.
 */
contract WhitelistAdminRole {
    using Roles for Roles.Role;

    event WhitelistAdminAdded(address indexed account);
    event WhitelistAdminRemoved(address indexed account);

    Roles.Role private _whitelistAdmins;

    constructor () internal {
        _addWhitelistAdmin(msg.sender);
    }

    modifier onlyWhitelistAdmin() {
        require(isWhitelistAdmin(msg.sender), "WhitelistAdminRole: caller does not have the WhitelistAdmin role");
        _;
    }

    function isWhitelistAdmin(address account) public view returns (bool) {
        return _whitelistAdmins.has(account);
    }

    function addWhitelistAdmin(address account) public onlyWhitelistAdmin {
        _addWhitelistAdmin(account);
    }

    function renounceWhitelistAdmin() public {
        _removeWhitelistAdmin(msg.sender);
    }

    function _addWhitelistAdmin(address account) internal {
        _whitelistAdmins.add(account);
        emit WhitelistAdminAdded(account);
    }

    function _removeWhitelistAdmin(address account) internal {
        _whitelistAdmins.remove(account);
        emit WhitelistAdminRemoved(account);
    }
}

// File: node_modules\@openzeppelin\contracts\token\ERC20\IERC20.sol

pragma solidity ^0.5.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP. Does not include
 * the optional functions; to access them see `ERC20Detailed`.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a `Transfer` event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through `transferFrom`. This is
     * zero by default.
     *
     * This value changes when `approve` or `transferFrom` are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * > Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an `Approval` event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a `Transfer` event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to `approve`. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// File: node_modules\@openzeppelin\contracts\math\SafeMath.sol

pragma solidity ^0.5.0;

/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}

// File: @openzeppelin\contracts\token\ERC20\ERC20.sol

pragma solidity ^0.5.0;



/**
 * @dev Implementation of the `IERC20` interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using `_mint`.
 * For a generic mechanism see `ERC20Mintable`.
 *
 * *For a detailed writeup see our guide [How to implement supply
 * mechanisms](https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226).*
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. This behavior is nonetheless conventional
 * and does not conflict with the expectations of ERC20 applications.
 *
 * Additionally, an `Approval` event is emitted on calls to `transferFrom`.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard `decreaseAllowance` and `increaseAllowance`
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See `IERC20.approve`.
 */
contract ERC20 is IERC20 {
    using SafeMath for uint256;

    mapping (address => uint256) internal _balances;
    mapping (address => mapping (address => uint256)) internal _allowances;

    uint256 private _totalSupply;

    /**
     * @dev See `IERC20.totalSupply`.
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See `IERC20.balanceOf`.
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See `IERC20.transfer`.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    /**
     * @dev See `IERC20.allowance`.
     */
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See `IERC20.approve`.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    /**
     * @dev See `IERC20.transferFrom`.
     *
     * Emits an `Approval` event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of `ERC20`;
     *
     * Requirements:
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `value`.
     * - the caller must have allowance for `sender`'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender].sub(amount));
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to `approve` that can be used as a mitigation for
     * problems described in `IERC20.approve`.
     *
     * Emits an `Approval` event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].add(addedValue));
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to `approve` that can be used as a mitigation for
     * problems described in `IERC20.approve`.
     *
     * Emits an `Approval` event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].sub(subtractedValue));
        return true;
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to `transfer`, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a `Transfer` event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a `Transfer` event with `from` set to the zero address.
     *
     * Requirements
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

     /**
     * @dev Destoys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a `Transfer` event with `to` set to the zero address.
     *
     * Requirements
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 value) internal {
        require(account != address(0), "ERC20: burn from the zero address");

        _totalSupply = _totalSupply.sub(value);
        _balances[account] = _balances[account].sub(value);
        emit Transfer(account, address(0), value);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
     *
     * This is internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an `Approval` event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 value) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    /**
     * @dev Destoys `amount` tokens from `account`.`amount` is then deducted
     * from the caller's allowance.
     *
     * See `_burn` and `_approve`.
     */
    function _burnFrom(address account, uint256 amount) internal {
        _burn(account, amount);
        _approve(account, msg.sender, _allowances[account][msg.sender].sub(amount));
    }
}

// File: @openzeppelin\contracts\token\ERC20\ERC20Detailed.sol

pragma solidity ^0.5.0;


/**
 * @dev Optional functions from the ERC20 standard.
 */
contract ERC20Detailed is IERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    /**
     * @dev Sets the values for `name`, `symbol`, and `decimals`. All three of
     * these values are immutable: they can only be set once during
     * construction.
     */
    constructor (string memory name, string memory symbol, uint8 decimals) public {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei.
     *
     * > Note that this information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * `IERC20.balanceOf` and `IERC20.transfer`.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
}

// File: node_modules\@openzeppelin\contracts\access\roles\MinterRole.sol

pragma solidity ^0.5.0;


contract MinterRole {
    using Roles for Roles.Role;

    event MinterAdded(address indexed account);
    event MinterRemoved(address indexed account);

    Roles.Role private _minters;

    constructor () internal {
        _addMinter(msg.sender);
    }

    modifier onlyMinter() {
        require(isMinter(msg.sender), "MinterRole: caller does not have the Minter role");
        _;
    }

    function isMinter(address account) public view returns (bool) {
        return _minters.has(account);
    }

    function addMinter(address account) public onlyMinter {
        _addMinter(account);
    }

    function renounceMinter() public {
        _removeMinter(msg.sender);
    }

    function _addMinter(address account) internal {
        _minters.add(account);
        emit MinterAdded(account);
    }

    function _removeMinter(address account) internal {
        _minters.remove(account);
        emit MinterRemoved(account);
    }
}

// File: @openzeppelin\contracts\token\ERC20\ERC20Mintable.sol

pragma solidity ^0.5.0;



/**
 * @dev Extension of `ERC20` that adds a set of accounts with the `MinterRole`,
 * which have permission to mint (create) new tokens as they see fit.
 *
 * At construction, the deployer of the contract is the only minter.
 */
contract ERC20Mintable is ERC20, MinterRole {
    /**
     * @dev See `ERC20._mint`.
     *
     * Requirements:
     *
     * - the caller must have the `MinterRole`.
     */
    function mint(address account, uint256 amount) public onlyMinter returns (bool) {
        _mint(account, amount);
        return true;
    }
}

// File: contracts\GiveToken.sol

pragma solidity ^0.5.0;





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

// File: contracts\GiveBox.sol

pragma solidity ^0.5.0;



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
