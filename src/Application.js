const generalMessages = require('../messages/generalMessages');
const dbConfig = require('../src/configs/dbConfig');

class Application {
    #server;
    #logger;
    #sequelize;

    constructor(server, logger, sequelize) {
        this.#server = server;
        this.#logger = logger;
        this.#sequelize = sequelize;
    }

    async start() {
        try {
            await this.#server.start();
            await this.#sequelize.authenticate();
            await this.#sequelize.sync();

            this.#logger.info(generalMessages.APP_STARTED);
            this.#logger.info(generalMessages.DB_STARTED_$, dbConfig.DB);

        } catch (err) {
            this.#logger.error(err);
        }
    }
}

module.exports = Application;