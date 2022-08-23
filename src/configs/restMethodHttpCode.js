const httpCodes = require('./httpCodes');
const restMethods = require('./restMethods');

module.exports = {
    [restMethods.POST]: httpCodes.CREATED
};