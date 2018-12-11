const
  config = require('./config'),
  Web3 = require('web3'),
  web3 = new Web3(config.web3.url);

module.exports = {

  setName: function (_name) {
    _name = _name.toString();
    contractUtility = require('./Sample');
    instance = new web3.eth.Contract(contractUtility.abi, contractUtility.address);
    web3.eth.personal.unlockAccount(config.web3.owner, config.web3.password)
      .then(res => {
        if (res) {
          instance.methods.setName(_name)
            .send({
              from: config.web3.owner
            })
            .then(receipt => {
              console.log(`**** Receipt @setName() ${JSON.stringify(receipt)}`)
            })
        }
      })
      .catch(err => {
        console.log(`**** Error @setName() ${err}`)
      })
  },

  getName: function () {
    contractUtility = require('./Sample');
    instance = new web3.eth.Contract(contractUtility.abi, contractUtility.address);

    instance.methods.Name()
      .call()
      .then(result => {
        console.log(`**** Result @getName() ${result}`)
      })
  }
}

require('make-runnable');
