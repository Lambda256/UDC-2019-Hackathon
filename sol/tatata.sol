pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract TATATA_Contract {
    
    using SafeMath for uint256;
    
    
    bool hasOwner = false;
    address private Owner;
    function  setPrimaryOwner() public returns(bool)
        {
            require(hasOwner==false,'already commit setPrimaryOwner()');
            Owner = msg.sender;
            hasOwner = true;
            return true;
        }
    function onlyOwner() public view
        {
            require(hasOwner==true,'TODO setPrimaryOwner');
            require(Owner == msg.sender,'NOT Owner');
        }
    function get_currentOwner() public view returns(address)
        {
            return Owner;   
        }
    function update_Owner(address update_address) public returns(bool)
        {
            onlyOwner();
            Owner = update_address;
            return true;
        }
        
        /*
        * we have uniqueid(key)-contracts_information(value) structure.
        * 
        */
        
    struct Contract_script 
        {
            string IdNUM;
            string value;
        }
        
    struct Rate_script 
        {
            string useraddress;
            uint256 rate;
            uint256 classification;
            uint256 NUM;
        }
        
        
    string[] private preIdNUMs;
    string[] private periIdNUMs;
    string[] private postIdNUMs;
    string[] private rate_address;
    
    
    // precontract selectkey = 1;
    mapping(string => Contract_script) private preContract;
    // periContract selectkey = 2;
    mapping(string => Contract_script) private periContract;
    // postContract selectkey = 3;
    mapping(string => Contract_script) private postContract;
    // rate information
    mapping(string => Rate_script) private Rates;
    
    function string_Compare(string memory string1, string memory string2) public pure returns (bool) 
        {
            return (keccak256(abi.encode(string1)) == keccak256(abi.encode(string2)));
        }
    
    function isalreadyRate (
        string memory user_address)
        public
        view
        returns(bool)
        {
            if(rate_address.length == 0) return false;
            return (string_Compare(Rates[user_address].useraddress ,user_address ));
        }
    
    function calcul_rate(
        string memory user_address,
        uint256 plus_rate)
        private
        view
        returns(uint256)
        {
            return (Rates[user_address].rate).mul(Rates[user_address].NUM).add(plus_rate).div(Rates[user_address].NUM+1);
        }
    
    
    function insertRate (
        string memory user_address,
        uint256 plus_rate,
        uint256 user_class
        )
        public
        returns(uint256)
        {
            onlyOwner();
            
            if(string_Compare(Rates[user_address].useraddress,user_address)){
                
                bool success =updateRate(user_address,plus_rate);
                
                require(success==true);
                
                return rate_address.length -1;
            }

            Rates[user_address].useraddress = user_address;
            Rates[user_address].rate = plus_rate;
            Rates[user_address].classification = user_class;
            Rates[user_address].NUM = 1;
            rate_address.push(user_address);
            
            return rate_address.length -1;
        }
    
    function updateRate (
        string memory user_address,
        uint256 plus_rate
        )
        public
        returns(bool success)
        {
            onlyOwner();
            require(string_Compare(Rates[user_address].useraddress,user_address),'TODO insertRate()');
            uint256 updated_rate = calcul_rate(user_address,plus_rate);
            Rates[user_address].rate = updated_rate;
            Rates[user_address].NUM =Rates[user_address].NUM.add(1);
            
            return true;

        }
        
        
    function getRate(
        string memory user_address
        )
        public
        view
        returns(
            string memory out_user_address,
            uint256 out_rate,
            uint256 out_classification,
            uint256 out_NUM
            )
            {
            return(
                Rates[user_address].useraddress,
                Rates[user_address].rate,  
                Rates[user_address].classification,
                Rates[user_address].NUM 
            );    
            }
            
    function getRatelist() public view returns(string[] memory out_ratelist){
        
            return rate_address;
        }
        
    function getRatelistCount() public view returns(uint256 count)
        {
                return rate_address.length;            
        }
        
        
        
        
    function isalreadyContract (
        string memory current_IdNUM,
        uint256 selectkey)
        public
        view
        returns(bool)
        {
            if(selectkey ==1)
            {
                if(preIdNUMs.length == 0) return false;
                return (string_Compare(preContract[current_IdNUM].IdNUM ,current_IdNUM ));                
            }

            
            if(selectkey ==2)
            {
                if(periIdNUMs.length == 0) return false;
                return (string_Compare(periContract[current_IdNUM].IdNUM ,current_IdNUM ));                
            }

            
            if(selectkey ==3)
            {
                if(postIdNUMs.length == 0) return false;
                return (string_Compare(postContract[current_IdNUM].IdNUM ,current_IdNUM ));
            }

        }
        
    function insertContract ( 
        string memory current_IdNUM,
        string memory v_value,
        uint256 selectkey
        )
        public
        returns(uint256 length_index)
        {   
            onlyOwner();
            
            if(selectkey ==1)
            {
                require(!string_Compare(preContract[current_IdNUM].IdNUM,current_IdNUM),'already has uniqueid(Id_NUM)');
                preContract[current_IdNUM].IdNUM = current_IdNUM;
                preContract[current_IdNUM].value = v_value;
                preIdNUMs.push(current_IdNUM);
                return preIdNUMs.length -1;
            }
            
            if(selectkey ==2)
            {
                require(!string_Compare(periContract[current_IdNUM].IdNUM,current_IdNUM),'already has uniqueid(Id_NUM), can use update');
                periContract[current_IdNUM].IdNUM = current_IdNUM;
                periContract[current_IdNUM].value = v_value;
                periIdNUMs.push(current_IdNUM);
                return periIdNUMs.length -1;
            }

            
            if(selectkey ==3)
            {
                require(!string_Compare(postContract[current_IdNUM].IdNUM,current_IdNUM),'already has uniqueid(Id_NUM)');
                postContract[current_IdNUM].IdNUM = current_IdNUM;
                postContract[current_IdNUM].value = v_value;
                postIdNUMs.push(current_IdNUM);
                return postIdNUMs.length -1;                
            }

        }
        
    function updateContract (
        string memory current_IdNUM,
        string memory update_value,
        uint256 selectkey
        )
        public
        returns(bool success)
        {   
            onlyOwner();
            
            
            if(selectkey ==1)
            {
                require(string_Compare(preContract[current_IdNUM].IdNUM,current_IdNUM));
                preContract[current_IdNUM].value = update_value;
                return true;              
            }

            
            if(selectkey==2)
            {
                require(string_Compare(periContract[current_IdNUM].IdNUM,current_IdNUM));
                periContract[current_IdNUM].value = update_value;
                return true;                
            }

            
            if(selectkey==3)
            {
                require(string_Compare(postContract[current_IdNUM].IdNUM,current_IdNUM));
                postContract[current_IdNUM].value = update_value;
                return true;                
            }

            
        }

    function getContract (
    string memory get_IdNUM,
    uint256 selectkey)
        public
        view
        returns(
            string memory out_IdNUM,
            string memory out_value
            )
        {
            
        if(selectkey ==1)
        {   
            require(string_Compare(preContract[get_IdNUM].IdNUM,get_IdNUM),'preContract has not IdNUM');
            return(
            preContract[get_IdNUM].IdNUM,
            preContract[get_IdNUM].value
            );            
        }

        if(selectkey ==2)
        {
            require(string_Compare(periContract[get_IdNUM].IdNUM,get_IdNUM),'periContract has not IdNUM');
            return(
            periContract[get_IdNUM].IdNUM,
            periContract[get_IdNUM].value
            );            
        }

            
        if(selectkey ==3)
        {
            require(string_Compare(postContract[get_IdNUM].IdNUM,get_IdNUM),'postContract has not IdNUM');
            return(
            postContract[get_IdNUM].IdNUM,
            postContract[get_IdNUM].value
            );            
        }

            
            
        }
    function getContractCount(uint256 selectkey) public view returns(uint256 count)
        {
            if(selectkey ==1)
            {
                return preIdNUMs.length;            
            }
            if(selectkey ==2)
            {
                return periIdNUMs.length;            
            }
            if(selectkey ==3)
            {
                return postIdNUMs.length;            
            }

        }
        
    function getContractIdNUMSlist(uint256 selectkey) public view returns(string[] memory out_IdNUM){
        
        if(selectkey ==1)
        {
            return preIdNUMs;            
        }
        if(selectkey ==2) 
        {
            return periIdNUMs;            
        }
        if(selectkey ==3) 
        {
            return postIdNUMs;            
        }

        

        }
}



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
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     *
     * NOTE: This is a feature of the next version of OpenZeppelin Contracts.
     * @dev Get it via `npm install @openzeppelin/contracts@next`.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
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
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     * NOTE: This is a feature of the next version of OpenZeppelin Contracts.
     * @dev Get it via `npm install @openzeppelin/contracts@next`.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
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
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * NOTE: This is a feature of the next version of OpenZeppelin Contracts.
     * @dev Get it via `npm install @openzeppelin/contracts@next`.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}


