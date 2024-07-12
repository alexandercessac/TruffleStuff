// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

import "./Goal.sol";

contract GoalFactory {
    function createGoal(string memory goalName, string memory goalDescription, uint goalReward) public {
        new Goal(goalName, msg.sender, goalDescription, goalReward);
    }
}