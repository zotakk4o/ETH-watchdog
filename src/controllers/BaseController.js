const generalErrors = require('../../errors/generalErrors');
const httpCodes = require('../configs/httpCodes');
const restMethods = require('../configs/restMethods');
const routingConfig = require('../configs/routing');

class BaseController {
    #validationSchema;
    #validator;
    #service;
    #supportedActions;

    constructor(validator, validationSchema, service, supportedActions = []) {
        this.#validator = validator;
        this.#validationSchema = validationSchema;
        this.#service = service;
        this.#supportedActions = supportedActions;
    }

    execute(req, res, next) {
        let method = BaseController.#getRequestMethod(req.method, req.params);
        if (!method || this.#supportedActions.indexOf(method) === -1) {
            next(new Error(generalErrors.ACTION_NOT_SUPPORTED))
        }

        let data = BaseController.#getRequestData(req);

        if (!this.#validator.isValid(this.#validationSchema[method], data)) {
            return next(new Error(this.#validator.getLastError()));
        }

        this[method](data)
            .then(response => res.status(httpCodes.OK).json(response))
            .catch(error => next(error))
    }

    static #getRequestData(req) {
        let data = {};
        if (!isObjectEmpty(req.body)) {
            data.data = req.body;
        }

        if (req.params[routingConfig.ID_PARAM_NAME]) {
            data.key = req.params[routingConfig.ID_PARAM_NAME];
        }

        if (!isObjectEmpty(req.query)) {
            data.query = req.query;
        }

        return data;
    }

    static #getRequestMethod(method, params) {
        if (params[routingConfig.ID_PARAM_NAME]) {
            method += "_ID"
        }

        return restMethods[method];
    }

    index(data) {
        return this.#service.findAllEntities(data.query);
    }

    show(data) {
        return this.#service.findEntityByPK(data.key);
    }

    store(data) {
        return this.#service.createEntity(data.data);
    }

    update(data) {
        return this.#service.updateEntityByPk(data.data, data.key);
    }

    destroy(data) {
        return this.#service.deleteEntityByPk(data.key);
    }
}

function isObjectEmpty(object) {
    return typeof object === 'object' && object !== null && !Object.keys(object).length;
}

module.exports = BaseController;