const { expect } = require("chai");
const {ethers} = require("hardhat")


describe("DecenMessages", ()=>{
  let DecenMessaging, deployer, user1, user2, user3
  
  beforeEach(async()=>{
    const decenMessagesFactory = await hre.ethers.getContractFactory("DecenMessaging")
    DecenMessaging = await decenMessagesFactory.deploy()
    await DecenMessaging.deployed()

    const accounts = await ethers.getSigners()

    deployer = accounts[0]
    user1 = accounts[1]
    user2 = accounts[2]
    user3 = accounts[3]

    console.log(`Decen Messaging Deployed to ${DecenMessaging.address}`)
  })
  it("checks the contract was deployed", async () =>{
    const admin = await DecenMessaging.admin()
    expect(admin).to.equal(deployer.address)
  })
})