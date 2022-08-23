const {Router, json} = require('express');
const routingConfig = require('../configs/routing');
const generalErrors = require('../../errors/generalErrors');

module.exports = (logger, errorHandler, container) => {
    let router = Router();
    let apiRouter = Router();

    let configurationsController = container.resolve('configurationsController');
    let configurationsMiddlewares = [configurationsController.execute.bind(configurationsController)];

    let transactionsController = container.resolve('transactionsController');
    let transactionsMiddlewares = [transactionsController.execute.bind(transactionsController)];

    apiRouter.route('/configurations')
        .get(configurationsMiddlewares)
        .post(configurationsMiddlewares);

    apiRouter.route('/configurations/:' + routingConfig.ID_PARAM_NAME)
        .get(configurationsMiddlewares)
        .delete(configurationsMiddlewares);

    apiRouter.route('/configurations/setActive/:' + routingConfig.ID_PARAM_NAME)
        .put(configurationsMiddlewares);

    apiRouter.route('/transactions')
        .get(transactionsMiddlewares);

    apiRouter.route('/transactions/:' + routingConfig.ID_PARAM_NAME)
        .get(transactionsMiddlewares);

    router.use(json());
    router.use('/', apiRouter);

    router.all('*', function(req, res, next){
        next(new Error(generalErrors.ROUTE_NOT_SUPPORTED))
    });

    router.use(errorHandler);

    return router;
};