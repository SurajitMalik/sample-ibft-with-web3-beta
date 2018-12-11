const
  config = require('./config'),
  Web3 = require('web3'),
  web3 = new Web3(config.web3.url),
  solc = require('solc'),
  fs = require('fs'),
  jsonfile = require('jsonfile');

let
  build = solc.compile(fs.readFileSync('Sample.sol', 'utf8'), 1),
  abi = JSON.parse(build.contracts[':Sample'].interface),
  byteCode = '0x' + build.contracts[':Sample'].bytecode,
  estimatedGas;

let
  contract = new web3.eth.Contract(abi);
contract.options.data = byteCode;

contract.deploy()
  .estimateGas((err, gas) => {
    if (!err) {
      estimatedGas = gas;
      console.log(`**** Gas Required ${gas}`);
    }
  })

web3.eth.personal.unlockAccount(config.web3.owner, config.web3.password)
  .then((res) => {
    if (res) {
      contract.deploy()
        .send({
          from: config.web3.owner,
          gas: estimatedGas,
          gasPrice: 0
        })
        .then((instance) => {
          let obj = {
            abi: abi,
            byteCode: byteCode,
            address: instance.options.address
          }
          jsonfile.writeFile('Sample.json', obj);
          console.log(`**** Contract address after deployment ${instance.options.address}`)
        })
        .catch(err => {
          console.log(`**** Error ${err}`)
        })
    }
  })
  .catch(err => {
    console.log(`***** Error ${err}`)
  })
