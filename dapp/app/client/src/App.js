import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log('got web3');

      // Use web3 to get the user's accounts.
      //const acc = await web3.eth.getAccounts();

      const accounts = [];
      let accs = await web3.eth.getAccounts();
      console.log(accs);
      for(let acc of accs) {
          console.log('get balance: ' + acc);
          let balanceWei = await web3.eth.getBalance(acc);
          accounts.push({id: acc, balance: web3.utils.fromWei(balanceWei, "ether")});
      }

//(await web3.eth.getAccounts()).forEach(async ac => console.log(ac + ' ' + web3.utils.fromWei(await web3.eth.getBalance(ac), "ether")))

      console.log('got accounts. count: ' + accounts.length);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log('network Id: ' + networkId);

      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`, error );
      console.error(error);
    }
  };

  runExample = async () => {
    const { web3, accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });
    const response = await web3.eth.getBalance(accounts[0].id);
    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ balance: response, accounts });
  };
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Accounts</h1>
        <p>See info about you account balances and other accounts on the network</p>
        <h2>Your Account info</h2>
        <div><b>Account Address:</b> {this.state.accounts[0].id}</div>
        <div><b>Balance:</b> {this.state.balance} ETH</div>
        <br/>
        <h2>Other Accounts</h2>
        {this.state.accounts.map(acc => { return <li>{acc.id + ": " + acc.balance + " ETH" }</li>})}
      </div>
    );
  }
}

export default App;
