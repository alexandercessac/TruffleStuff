var Goal = artifacts.require("./Goal.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Goal, 'Clean Room', accounts[0], 'Pick up all of the things on the the floor', 10000);
};

// 0x4d56dCF8F1983b0fECFF9B38E45fEd1B11B2F2D0
