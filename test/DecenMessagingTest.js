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

  })
  describe("Deployment", () =>{
    
    it("checks the contract deployer address", async () =>{
      const admin = await DecenMessaging.admin()
      expect(admin).to.equal(deployer.address)
    })
    it("checks the initial message count", async () => {
      const messagenum = await DecenMessaging.messageCount()
      expect(messagenum.toString()).to.equal("0")
    })
  })
  describe("set message character limit", async() =>{
    it("checks the message limit", async () =>{
      const messageLimit = await DecenMessaging.messageLength()
      expect(messageLimit.toString()).to.equal("100")
    })
    it("checks the change message limit", async () =>{
      await DecenMessaging.connect(deployer).setMessageLimit(5)
      const newMessageLimit = await DecenMessaging.messageLength()
      expect(newMessageLimit.toString()).to.equal("5")
    })
    it("checks the message limit is working", async () =>{
      await DecenMessaging.connect(deployer).setMessageLimit(5)
      await expect(DecenMessaging.connect(user1).sendMessage(user2.address, "Hello There")).to.be.reverted
    })
  })
  describe("send message function", async () =>{
    let messageTxn, messageStruct
    beforeEach(async()=>{
      messageTxn = await DecenMessaging.connect(user1).sendMessage(user2.address, "Hello There")
      messageStruct = await DecenMessaging.FromUser(user1.address, 0)
    })
    it("checks the message number", async () => {
      // const messageCount = await DecenMessaging.messageCount()
      expect(messageStruct["messageNumber"].toString()).to.equal("1")
    })
    it("checks the message sender", async () =>{
      expect(messageStruct["sender"]).to.equal(user1.address)
    })
    it("checks the message receiver", async () =>{
      expect(messageStruct["receiver"]).to.equal(user2.address)
    })
    it("checks the message text", async () =>{
      expect(messageStruct["textMessage"]).to.equal("Hello There")
    })
  })
  
})