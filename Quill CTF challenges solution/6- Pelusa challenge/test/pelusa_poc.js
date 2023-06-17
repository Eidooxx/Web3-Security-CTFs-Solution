const {expect} = require ("chai");
const {ethers} = require ("hardhat");

describe("Quill CTFs challenge 6: Pelusa ",()=>{
    let pelusacontract;
    let deployattackpelusacontract;
    let attackpelusadeploymentaddress;
    let attackcontract;
    let owner,attacker;
    before(async()=>{
        [owner , attacker] = await ethers.getSigners();

        const PELUSACONTRACT = await ethers.getContractFactory("Pelusa",owner);
        pelusacontract = await PELUSACONTRACT.deploy();
    })

    it ("should deploy the deploy attack contract with specific address",async()=>{
        const DEPLOYATTACKPELUSACONTRACT = await ethers.getContractFactory("deployattackpelusa",attacker);
        deployattackpelusacontract = await DEPLOYATTACKPELUSACONTRACT.deploy(pelusacontract.target);
        attackpelusadeploymentaddress = await deployattackpelusacontract.attack_pelusacontract();
    })
    it ("should deploy the attack contract and score 2 goals",async()=>{
        const ATTACKCONTRACT = await ethers.getContractFactory("Attack",attacker);
        attackcontract = await ATTACKCONTRACT.deploy(attackpelusadeploymentaddress);
        await attackcontract.scoretwogoals(owner.address);
        expect (await pelusacontract.goals()).to.equal(2);
    })


})