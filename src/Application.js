const generalMessages = require('../messages/generalMessages');

class Application {
    #server;
    #logger;

    constructor(server, logger) {
        this.#server = server;
        this.#logger = logger;
    }

    async start() {
        try {
            await this.#server.start();
            this.#logger.info(generalMessages.APP_STARTED);
        } catch (err) {
            this.#logger.error(err);
        }
    }
}

module.exports = Application;