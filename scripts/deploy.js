const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const decenMessContractFactory = await hre.ethers.getContractFactory("DecenMessaging")
  const DecenMessaging = await decenMessContractFactory.deploy()
  await DecenMessaging.deployed()

  console.log(`Decen Messaging Deployed To: ${DecenMessaging.address}`)

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
