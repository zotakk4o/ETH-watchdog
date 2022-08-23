const generalErrors = require('../../errors/generalErrors');
const httpCodes = require('../configs/httpCodes');
const restMethods = require('../configs/restMethods');
const routingConfig = require('../configs/routing');
const restMethodHttpCode = require('../configs/restMethodHttpCode');

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

    /**
     * Executes one of the predefined REST methods (index, show, store, update, destroy) if they are allowed
     * Validates the request against the REST method validation schema
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @returns {Promise|undefined}
     */
    execute(req, res, next) {
        let method = BaseController.#getRequestMethod(req.method, req.params);
        if (!method || this.#supportedActions.indexOf(method) === -1) {
            return next(new Error(generalErrors.ACTION_NOT_SUPPORTED))
        }

        let data = BaseController.#getRequestData(req);

        if (!this.#validator.isValid(this.#validationSchema[method], data)) {
            return next(new Error(this.#validator.getLastError()));
        }

        let sucessfulRequestStatus = restMethodHttpCode[method] || httpCodes.OK;
        this[method](data)
            .then(response => res.status(sucessfulRequestStatus).json(response))
            .catch(error => next(error))
    }

    /**
     * Retrieves the necessary data for the REST methods
     * @param {Object} req
     * @returns {Object} data - data.query data.key, data.data
     */
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

    /**
     * Translates the HTTP method to one of the predefined REST methods
     * @param {String} method - GET, POST, PUT, DELETE
     * @param {Object} params - request query parameters
     * @returns {String} - (index, show, store, update, destroy)
     */
    static #getRequestMethod(method, params) {
        if (params[routingConfig.ID_PARAM_NAME]) {
            method += "_ID"
        }

        return restMethods[method];
    }

    /**
     * Retrieves data for all entities for a given table
     * @param {Object} data
     * @returns {Promise<Model[]>}
     */
    index(data) {
        return this.#service.findAllEntities(data.query);
    }

    /**
     * Retrieves data for a single entities by key
     * @param {Object} data
     * @returns {Promise<Model>}
     */
    show(data) {
        return this.#service.findEntityByPK(data.key);
    }

    /**
     * Store an entity in the DB with given data
     * @param {Object} data
     * @returns {Promise<Model>}
     */
    store(data) {
        return this.#service.createEntity(data.data);
    }

    /**
     * Updates an entity in the DB by given key and data
     * @param {Object} data
     * @returns {Promise}
     */
    update(data) {
        return this.#service.updateEntityByPk(data.data, data.key);
    }

    /**
     * Deletes an entity from the DB
     * @param {Object} data
     * @returns {Promise}
     */
    destroy(data) {
        return this.#service.deleteEntityByPk(data.key);
    }

    get service() {
        return this.#service;
    }
}

function isObjectEmpty(object) {
    return typeof object === 'object' && object !== null && !Object.keys(object).length;
}

module.exports = BaseController;