// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Goal {
    string public name;
    address public creator;
    address public assignedTo;
    string public description;
    bool public complete;
    uint public reward;
    
    constructor(string memory goalName, address goalCreator, string memory goalDescription, uint goalReward) {
            name = goalName;
            creator = goalCreator;
            description = goalDescription;
            reward = goalReward;
            complete = false;
        }
}