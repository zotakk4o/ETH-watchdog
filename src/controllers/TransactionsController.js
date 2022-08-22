const BaseController = require('./BaseController');

class TransactionsController extends BaseController{
    constructor(requestValidator, transactionsValidationSchema, transactionsService, controllersConfig) {
        super(
            requestValidator,
            transactionsValidationSchema,
            transactionsService,
            controllersConfig.TransactionsController
        );
    }
}

module.exports = TransactionsController;