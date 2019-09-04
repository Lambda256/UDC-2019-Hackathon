pragma solidity ^0.4.25;

contract SpoTP {
  struct Ticket {
    uint id;
    string date;
    string seat;
    string name;
    address owner;
    bool isSold;
    bool isMapped;
  }

 struct Product {
   uint id;
   string name;
   address owner;
   bool isSold;
   bool isMapped;
 }

 Ticket[] private tickets;
 Product[] private products;

 mapping (uint => uint) private namehashToProductCount;

 //For Tickets
 function getTicketOwner(uint _id) public view returns (address) {
   for(uint i=0;i<tickets.length;i++){
     if(tickets[i].id == _id){
       return tickets[i].owner;
     }
   }
 }

 function getOwnedTickets() public view returns (uint[]) {
   uint counter = 0;
   for(uint i=0; i<tickets.length; i++){
     if(tickets[i].owner == msg.sender) {
       counter++;
     }
   }
   uint[] memory result = new uint[](counter);
   counter = 0;
   for(i=0; i<tickets.length; i++){
     if(tickets[i].owner == msg.sender) {
       result[counter] = tickets[i].id;
       counter++;
     }
   }
   return result;
 }

 function _createNewTicket(uint _id, string _date, string _seat, string _name, address _owner) private {
   Ticket memory t = Ticket(_id, _date, _seat, _name, _owner, false, true);
   tickets.push(t);
 }

 function addTicket(uint _id, string _date, string _seat, string _name) public {
   _createNewTicket(_id, _date, _seat, _name, msg.sender);
 }

 function buyTicket(uint _id) public {
   for(uint i=0;i<tickets.length;i++){
     if(tickets[i].id == _id){
       require(tickets[i].owner != msg.sender);
       tickets[i].owner = msg.sender;
       tickets[i].isSold = true;
     }
   }
 }

 //For Products

 function getProductOwner(uint _id) public view returns (address) {
   for(uint i=0;i<products.length;i++){
     if(products[i].id == _id){
       return products[i].owner;
     }
   }
 }

 function getOwnedProducts() public view returns (uint[]) {
   uint counter = 0;
   for(uint i=0; i<products.length; i++){
     if(products[i].owner == msg.sender) {
       counter++;
     }
   }
   uint[] memory result = new uint[](counter);
   counter = 0;
   for(i=0; i<products.length; i++){
     if(products[i].owner == msg.sender) {
       result[counter] = products[i].id;
       counter++;
     }
   }
   return result;
 }

 function _createNewProduct(uint _id, string _name, address _owner) private {
   Product memory p = Product(_id, _name, _owner, false, true);
   namehashToProductCount[uint(keccak256(_name))]++;
   products.push(p);
 }

 function addProduct(uint _id, string _name) public returns (bool) {
   _createNewProduct(_id, _name, msg.sender);
 }

 function buyProduct(uint _id) public {
   for(uint i=0;i<products.length;i++){
     if(products[i].id == _id){
       require(products[i].owner != msg.sender);
       require(namehashToProductCount[uint(keccak256(products[i].name))]>0);
       products[i].owner = msg.sender;
       products[i].isSold = true;
       namehashToProductCount[uint(keccak256(products[i].name))]--;
     }
   }
 }

}
