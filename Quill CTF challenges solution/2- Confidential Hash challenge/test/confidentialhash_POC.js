const {expect} = require ("chai");
const {ethers} = require ("hardhat");

describe ("Quill CTF challenge: #2:Confidental hash",()=>{
  let confidentialhashcontract;
  let contractdeployer;

  beforeEach(async()=>{
    // Deploy the Confidential contract
    const CONFIDENTIALHASHCONTRACT = await ethers.getContractFactory("Confidential");
    confidentialhashcontract = await CONFIDENTIALHASHCONTRACT.deploy();
    // get the contract deployer address
    [contractdeployer] = await ethers.getSigners();
  })  

  it("Check the hash of aliceHash and bobHash function should return true ",async()=>{
    
    // confidentialhashcontract.target returns the address of deployed contract
    // Get the two hashes from the private variables: aliceHash and bobHash
    const aliceHash = await ethers.provider.getStorage(confidentialhashcontract.target,6);
    const bobHash = await ethers.provider.getStorage(confidentialhashcontract.target,9);
    // pass these two hashes into the hash function in the ethers called solidityPackedKeccak256
    const hash = await ethers.solidityPackedKeccak256(["bytes32", "bytes32"], [aliceHash, bobHash]);
    // Check if the hash is equal to the correct hash 
    // finding the hash from hash function in the contract
    const comparehash = await confidentialhashcontract.hash(aliceHash,bobHash);
    // Check if the hash is equal to comparehash
    expect(hash).to.equal(comparehash);
    


  })
})


