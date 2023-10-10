require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/zNz0OOXzeqVU0Q01WY9818R7xU4MIvDo',
      accounts: [
        '90e1c9250e86a9bae3b7897f9694db339e716105b93fb10934cb72c29fa2d263'
      ]
    }
  }
};
