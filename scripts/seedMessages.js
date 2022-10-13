
const hre = require("hardhat");

const DecenMessageContract ="0x5FbDB2315678afecb367f032d93F642f64180aa3"

async function main() {
    const accounts = await ethers.getSigners()

    const signer = accounts[0];

    const DecenMessaging = await hre.ethers.getContractAt("DecenMessaging", DecenMessageContract, signer)
    console.log(`DecenMessaging fetched at ${DecenMessaging.address}`)

    const sender = accounts[1]
    const receiver = accounts[2]

    let message1, message2

    message1 = await DecenMessaging.connect(sender).sendMessage(receiver.address, "Hello There")
    await message1.wait()
    console.log(message1)
    message1 = await DecenMessaging.connect(sender).sendMessage(receiver.address, "Hello There2")
    await message1.wait()
    console.log(message1)
    message1 = await DecenMessaging.connect(sender).sendMessage(receiver.address, "Hello There3")
    await message1.wait()
    console.log(message1)

    message2 = await DecenMessaging.connect(receiver).sendMessage(sender.address, "General Kenobi")
    await message2.wait()
    console.log(message2)
    message2 = await DecenMessaging.connect(receiver).sendMessage(sender.address, "General Kenobi2")
    await message2.wait()
    console.log(message2)
    message2 = await DecenMessaging.connect(receiver).sendMessage(sender.address, "General Kenobi3")
    await message2.wait()
    console.log(message2)



}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
