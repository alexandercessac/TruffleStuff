var GoalFactory = artifacts.require("./GoalFactory.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(GoalFactory);
};

// 0x3213845b118a8d6a5c2D2F7BAD52EA1447e06cab
