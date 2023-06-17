// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Pelusa.sol";
import "./attack_pelusa.sol";

contract Attack {

    attack_pelusa public attackpelusa; 

    constructor (address _attackpelusacontract) {
        attackpelusa = attack_pelusa(_attackpelusacontract);
    }

    function scoretwogoals (address pelusaconractdeployer) public{
        attackpelusa.attackpelusa(pelusaconractdeployer);
    }
}