import Web3 from 'web3'

let web3;

//see if we are running in browser
if (typeof window !== 'undefined' &&  typeof window.web3 != 'undefined' ) {
  //we are in browser and metamask is running
//metamask uses its own web3
  web3 = new Web3(window.web3.currentProvider);

  } else {
    //we are on server and user is not running metamask
    //we will infura and connect to rinkeby

    const provider = new Web3.providers.HttpProvider(
       'https://rinkeby.infura.io/v3/a39f89fd558f413ea1d51e2714fcd5c5'
    );

    web3 = new Web3(provider);
}

export default web3;
