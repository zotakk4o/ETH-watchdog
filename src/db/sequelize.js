const {Sequelize} = require('sequelize');
const dbConfig = require('../configs/dbConfig');

module.exports = (logger) => {
    return new Sequelize(dbConfig.DB, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
        host: dbConfig.DB_HOST,
        port: dbConfig.DB_PORT,
        dialect: dbConfig.DB_DIALECT,
        logging: msg => logger.info(msg)
    });
};
