const path = require('path');
const projDir = path.resolve(__dirname);

module.exports = {
    INFURA_API_KEY: "0cd5f9676b5745f0a10fa68267d0ee6a",
    INFURA_WSS_ENDPOINT: "wss://mainnet.infura.io/ws/v3/0cd5f9676b5745f0a10fa68267d0ee6a",
    HTTP_SERVER_PORT: 3080,
    LOG_FILE_PATH: projDir + '/logs/main.log'
};