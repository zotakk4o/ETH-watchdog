const BaseRepository = require('./BaseRepository');

class TransactionsRepository extends BaseRepository {
    constructor(transaction) {
        super(transaction);
    }
}

module.exports = TransactionsRepository;