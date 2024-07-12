var Goal = artifacts.require("./Goal.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Goal, 'Brush Teeth', accounts[0], 'Make sure your teeth are brushed and flossed', 5000);
};

// 0xeD02C019724637232cd55940c78B90354a4D1B60
