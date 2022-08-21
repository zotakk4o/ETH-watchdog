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
const Transaction = require('./src/models/Transaction');
const Configuration = require('./src/models/Configuration');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC,
});

container
    .register({
        server: awilix.asClass(Server, {lifetime: Lifetime.SINGLETON}),
        sequelize: awilix.asValue(sequelize, {lifetime: Lifetime.SINGLETON}),
        router: awilix.asFunction(router, {lifetime: Lifetime.SINGLETON}).inject((c) => ({ container: c })),
        config: awilix.asValue(config),
        logger: awilix.asFunction(logger, {lifetime: Lifetime.SINGLETON}),
        app: awilix.asClass(Application, {lifetime: Lifetime.SINGLETON}),
        requestValidator: awilix.asClass(requestValidator, {lifetime: Lifetime.SINGLETON}),
        errorHandler: awilix.asFunction(errorHandler, {lifetime: Lifetime.SINGLETON}),
        configurationsValidationSchema: awilix.asValue(configurationsValidationSchema),
        transactionsValidationSchema: awilix.asValue(transactionsValidationSchema),
        dbConfig: awilix.asValue(dbConfig),
        transaction: awilix.asFunction(Transaction, {lifetime: Lifetime.SINGLETON}),
        configuration: awilix.asFunction(Configuration, {lifetime: Lifetime.SINGLETON})
    });

container.loadModules([
        './src/controllers/*.js',
    ], {
        formatName: 'camelCase',
        resolverOptions: {
            register: awilix.asClass
        }
    }
);



module.exports = container;