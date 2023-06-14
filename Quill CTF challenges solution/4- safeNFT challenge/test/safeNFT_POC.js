const {expect} = require ("chai");
const{ethers} = require("hardhat");

describe ("Quillctf: 4.safeNFT challenge",()=>{

  let safenftcontract;
  let attacksafenftcontract;
  // two address of different two owener, one for safenft contract and other for the attacksafenft contract
  let safenftcontractowner , attacknftcontractowner;
  // count of nfts to be minted
  const nftscount = 10; 
  const nftprice = ethers.parseEther("0.1");

  beforeEach(async()=>{
    // get two different addresses
    [safenftcontractowner, attacknftcontractowner] = await ethers.getSigners();

    // deploy the safenftcontract
    const SAFENFTCONTRACT = await ethers.getContractFactory("safeNFT",safenftcontractowner);
    safenftcontract = await SAFENFTCONTRACT.deploy("safeNFT","SN",nftprice);
  })

  it("should claim (mint) 10 nfts with price of one nft only 0.1 ether" , async()=>{
    const ATTACKSAFENFTCONTRACT = await ethers.getContractFactory("Attack_safeNFT",attacknftcontractowner);
    attacksafenftcontract = await ATTACKSAFENFTCONTRACT.deploy(nftscount,safenftcontract.target);

    // call MintNFT from the attack safe nft contract
    await attacksafenftcontract.attacksafenft({value:nftprice});
    expect(await safenftcontract.balanceOf(attacksafenftcontract.target)).to.equal(nftscount);
    // should claim (mint) 10 nfts 
    // challenge done
   

  }
  )

})