const BaseService = require('./BaseService');

class TransactionsService extends BaseService {
    constructor(transactionsRepository) {
        super(transactionsRepository);
    }
}

module.exports = TransactionsService;