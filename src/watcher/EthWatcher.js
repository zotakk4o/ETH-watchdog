const generalMessages = require('../../messages/generalMessages');
const generalErrors = require('../../errors/generalErrors');

class EthWatcher {
    #web3;
    #subscription;
    #logger;
    #configurationsService;
    #transactionsService;
    #configuration;

    constructor(web3, logger, configurationsService, transactionsService) {
        this.#web3 = web3;
        this.#logger = logger;
        this.#configurationsService = configurationsService;
        this.#transactionsService = transactionsService;
        this.#subscription = null;
        this.#configuration = null;
    }

    /**
     * Handles incoming new blocks from the Ethereum chain
     * Matches the transactions from the block agains the active configuration
     * Saves in the DB those transactions that are matched
     * @param {Error} err
     * @param {Block} result
     * @returns undefined
     */
    blockHandler(err, result) {
        if (err) {
            return this.#logger.error(err);
        }

        const {number} = result;
        this.getBlock(number)
            .then(block => {
                this.#logger.info(generalMessages.NEW_BLOCK_$, block.hash);
                for(let i = 0; i < block.transactions.length; i++) {
                    this.getTransactionFromBlock(block.hash, i)
                        .then(transaction => {
                            if (this.#doesTransactionMatch(transaction)) {
                                this.#saveTransaction(transaction);
                            }
                        })
                }
            })
            .catch(err => {
                this.#logger.error(err);
            });

    }

    /**
     * Gets block data by a given block number
     * @param {Number} number
     * @returns {Promise<Block>}
     */
    getBlock(number) {
        return this.#web3.eth.getBlock(number);
    }

    /**
     * Gets transactions data from a given block on the chain
     * @param blockHash
     * @param transactionIndex
     * @returns {Promise<Transaction>}
     */
    getTransactionFromBlock(blockHash, transactionIndex) {
        return this.#web3.eth.getTransactionFromBlock(blockHash, transactionIndex);
    }

    /**
     * subscribes the watcher to an ETH node
     * @returns {Promise}
     */
    subscribe() {
        this.#logger.info(generalMessages.WATCHER_SUBSCRIBING);

        return this.#configurationsService.getActiveConfiguration()
            .then(configuration => {
                if (!configuration) {
                    this.#logger.error(generalErrors.CANT_FIND_ACTIVE_CONFIG);
                    return;
                }

                this.configuration = configuration;
                this.#subscription = this.#web3.eth.subscribe("newBlockHeaders", this.blockHandler.bind(this))
            });
    }

    /**
     * Unsubscribes the watcher from the ETH node
     * @returns {Promise<unknown>}
     */
    unsubscribe() {
        this.#logger.info(generalMessages.STOPPING_WATCHER);

        return new Promise((resolve, reject) => {
            if (!this.#subscription) {
                this.#logger.info(generalMessages.WATCHER_STOPPED);
                return resolve(true);
            }

            this.#subscription.unsubscribe(function(error, success) {
                this.#subscription = null;
                if (error) {
                    this.#logger.error(error);
                    return reject(error);
                }
                this.#logger.info(generalMessages.WATCHER_STOPPED);
                resolve(success);
            }.bind(this));
        });
    }

    /**
     * Matches a given transaction against the DB active configuration
     * @param {Transaction} transaction
     * @returns {boolean}
     */
    #doesTransactionMatch(transaction) {
        //TODO: Fix this awful comparison, e.g. via Factory pattern with validators
        //I am really sorry for this :(
        return !(this.#configuration.from && transaction.from !== this.#configuration.from ||
            this.#configuration.to && transaction.to !== this.#configuration.to ||
            this.#configuration.valueFrom && Number(transaction.value) < Number(this.#configuration.valueFrom) ||
            this.#configuration.valueTo && Number(transaction.value) > Number(this.#configuration.valueTo) ||
            this.#configuration.gasFrom && Number(transaction.gas) < Number(this.#configuration.gasFrom) ||
            this.#configuration.gasTo && Number(transaction.gas) > Number(this.#configuration.gasTo) ||
            this.#configuration.gasPriceFrom && Number(transaction.gasPrice) < Number(this.#configuration.gasPriceFrom) ||
            this.#configuration.gasPriceTo && Number(transaction.gasPrice) > Number(this.#configuration.gasPriceTo));
    }

    /**
     * Saves a transaction that has matched the active configuration
     * @param {Transaction} transaction
     * @returns {Promise<Transaction>}
     */
    #saveTransaction(transaction) {
        transaction.configName = this.#configuration.configName;
        return this.#transactionsService.createEntity(transaction)
            .catch(err => this.#logger.error(err));
    }

    isSubscribed() {
        return this.#subscription !== null;
    }

    get configuration() {
        return this.#configuration;
    }

    set configuration(configuration) {
        this.#configuration = configuration;
    }

}

module.exports = EthWatcher;