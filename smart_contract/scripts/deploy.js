const hre = require("hardhat");

async function main() {
  const trasactions = await hre.ethers.deployContract("Transactions");
  await trasactions.waitForDeployment()
  const address = await trasactions.getAddress();

  console.log(`Deployed to ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
