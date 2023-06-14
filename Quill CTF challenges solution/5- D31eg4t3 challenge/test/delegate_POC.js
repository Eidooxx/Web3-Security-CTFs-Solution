const {expect} = require("chai");
const {ethers} = require ("hardhat");

describe ("QuillCT challenge solution: #5.  D31eg4t3" , ()=>{
  let d31g4t3contract;
  let attackd31g4t3contract;
  let owner , attacker;

  before(async()=>{
    // get two accounts
    [owner,attacker] = await ethers.getSigners();
    // deploy the challenge contract
    const D31G4T3CONTRACT = await ethers.getContractFactory("D31eg4t3",owner);
    d31g4t3contract = await D31G4T3CONTRACT.deploy();

  })

  //deploy the AttackD31eg4t3 contract 
  it ("should deploy the attack d31g4t3 contract" , async ()=>{
    const ATTAcKD31G4T3CONTRACT = await ethers.getContractFactory("AttackD31eg4t3",attacker);
    attackd31g4t3contract = await ATTAcKD31G4T3CONTRACT.deploy(d31g4t3contract.target);
  })

  // check owner of D31eg4t3 contract
  it ("should set the owner to attacker address  " , async ()=>{
    await attackd31g4t3contract.attackd31eg4t3contract();
    // check the owner of the D31eg4t3 contract , it should be the attacker address
    expect(await d31g4t3contract.owner()).to.equal(attacker.address);

  })

  // check the value of  canYouHackMe[attackeraddress]
  it ("should set the value of canYouHackMe[attacker address] to be true" , async ()=>{
    expect(await d31g4t3contract.canYouHackMe(attacker.address)).to.equal(true);
  
  })
  // CHALLENGE DONE
    
  


})