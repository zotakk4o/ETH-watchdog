const awilix = require("awilix");
const Lifetime = awilix.Lifetime;

const Server = require('./src/server/Server');
const router = require('./src/server/router');
const logger = require('./src/logger/logger');
const config = require('./config');
const Application = require('./src/Application');
const requestValidator = require('./src/helpers/RequestValidator');
const errorHandler = require('./src/helpers/errorHandler');
const configurationsValidationSchema = require('./src/validationSchemas/configurationsValidationSchema');
const transactionsValidationSchema = require('./src/validationSchemas/transactionsValidationSchema');
const dbConfig = require('./src/configs/dbConfig');
const sequelize = require('./src/db/sequelize');
const controllersConfig = require('./src/configs/controllersConfig');
const web3 = require('./src/watcher/web3');
const EthWatcher = require('./src/watcher/EthWatcher');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC,
});

container
    .register({
        server: awilix.asClass(Server, {lifetime: Lifetime.SINGLETON}),
        sequelize: awilix.asFunction(sequelize, {lifetime: Lifetime.SINGLETON}),
        web3: awilix.asFunction(web3, {lifetime: Lifetime.SINGLETON}),
        router: awilix.asFunction(router, {lifetime: Lifetime.SINGLETON}).inject((c) => ({container: c})),
        config: awilix.asValue(config),
        logger: awilix.asFunction(logger, {lifetime: Lifetime.SINGLETON}),
        app: awilix.asClass(Application, {lifetime: Lifetime.SINGLETON}),
        requestValidator: awilix.asClass(requestValidator, {lifetime: Lifetime.SINGLETON}),
        errorHandler: awilix.asFunction(errorHandler, {lifetime: Lifetime.SINGLETON}),
        configurationsValidationSchema: awilix.asValue(configurationsValidationSchema),
        transactionsValidationSchema: awilix.asValue(transactionsValidationSchema),
        dbConfig: awilix.asValue(dbConfig),
        controllersConfig: awilix.asValue(controllersConfig),
        ethWatcher: awilix.asClass(EthWatcher, {lifetime: Lifetime.SINGLETON})
    });

container.loadModules([
        './src/models/*.js',
    ], {
        formatName: 'camelCase',
        resolverOptions: {
            register: awilix.asFunction,
            lifetime: Lifetime.SINGLETON
        }
    }
);

container.loadModules([
    './src/controllers/*.js',
    './src/services/*.js',
    './src/repositories/*.js'
    ], {
        formatName: 'camelCase',
        resolverOptions: {
            register: awilix.asClass
        }
    }
);


module.exports = container;