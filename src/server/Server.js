const express = require('express');
const generalMessages = require('../../messages/generalMessages');

class Server {
    #app;
    #server;
    #port;
    #logger;

    constructor(router, config, logger) {
        this.#app = express();
        this.#setup(router, config);
        this.#logger = logger;
    }

    #setup(router, config) {
        this.#app.use(router);

        this.#port = config.HTTP_SERVER_PORT;
    }

    /**
     * Starts the HTTP server for the REST APIs
     * @returns {Promise}
     */
    start() {
        return new Promise((resolve, reject) => {
            let that = this;
            this.#server = this.#app.listen(this.#port, () => {
                that.#logger.info(generalMessages.SERVER_STARTED_$$, process.pid, that.#port);
                resolve();
            }).on('error', function(err) {
                that.#logger.error(err);
                reject(err);
            });
        });
    }

    /**
     * Stops the HTTP server for the REST APIs
     * @returns {Promise}
     */
    stop() {
        return new Promise((resolve, reject) => {
            this.#server.close(err => {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        })
    }
}

module.exports = Server;