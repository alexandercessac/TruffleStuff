const goalFactoryAbi = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "goalName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "goalDescription",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "goalReward",
          "type": "uint256"
        }
      ],
      "name": "createGoal",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
export default goalFactoryAbi