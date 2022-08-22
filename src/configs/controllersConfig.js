const restMethods = require('./restMethods');

module.exports = {
    ConfigurationsController: [
        restMethods.GET,
        restMethods.GET_ID,
        restMethods.POST,
        restMethods.DELETE_ID,
        restMethods.PUT_ID
    ],
    TransactionsController: [
        restMethods.GET,
        restMethods.GET_ID
    ]
};