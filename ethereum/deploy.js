const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/ArtWineFactory.json');


const provider = new HDWalletProvider(
  'bleak vessel breeze donate pledge whisper toy misery crazy thrive wrap educate',
  'https://rinkeby.infura.io/v3/a39f89fd558f413ea1d51e2714fcd5c5'
);

const web3 = new Web3(provider);


//arbitrary to make function since we need to use await which is async . we use promises instead.
const deploy = async () => {

  const accounts = await web3.eth.getAccounts();

  console.log('List of accounts I get from the rinkeby network ', accounts);

  console.log('Attempting to deploy from account ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
   .deploy({
     data : '0x' + compiledFactory.bytecode //trick to not to exceed gas limit
    })
  .send({ from : accounts[0],
    gas: '1000000'
    });


    console.log('contract deployed to ', result.options.address);

};

deploy();
