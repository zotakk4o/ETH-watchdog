const Web3 = require('web3');

module.exports = (config) => {
    return new Web3(config.INFURA_WSS_ENDPOINT);
};