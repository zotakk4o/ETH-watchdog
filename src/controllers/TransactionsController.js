const BaseController = require('./BaseController');

class TransactionsController extends BaseController{
    constructor(requestValidator, transactionsValidationSchema) {
        super(requestValidator, transactionsValidationSchema);
    }

    index(data) {
        return Promise.resolve(data);
    }
}

module.exports = TransactionsController;