pragma solidity ^0.4.18;

contract Product {
 string [8] owner;

 function setOwner(uint _index, string _name) public {
   owner[_index] = _name;
 }

 function getOwner(uint _index) public view returns (string) {
   return owner[_index];
 }
}
