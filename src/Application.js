const generalMessages = require('../messages/generalMessages');
const generalErrors = require('../errors/generalErrors');
const dbConfig = require('../src/configs/dbConfig');

class Application {
    #server;
    #logger;
    #sequelize;
    #ethWatcher;

    constructor(server, logger, sequelize, ethWatcher) {
        this.#server = server;
        this.#logger = logger;
        this.#sequelize = sequelize;
        this.#ethWatcher = ethWatcher;
    }

    start() {
        return this.#server.start()
            .then(() => this.#sequelize.authenticate())
            .then(() => this.#sequelize.sync())
            .then(() => this.#ethWatcher.subscribe())
            .then(() => {
                this.#logger.info(generalMessages.APP_STARTED);
                this.#logger.info(generalMessages.DB_STARTED_$, dbConfig.DB);
            })
            .catch(err => {
                this.#logger.error(err);
                this.#server.stop()
                    .then(() => this.#ethWatcher.unsubscribe())
                    .then(() => {
                        this.#logger.info(generalMessages.APP_STOPPED);
                        process.exit(0);
                    })
                    .catch(err => {
                        this.#logger.error(err);
                        this.#logger.error(generalErrors.CANT_STOP_APP);
                        process.exit(1);
                    })
            })
    }
}

module.exports = Application;