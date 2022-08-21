const generalErrors = require('../../errors/generalErrors');
const httpCodes = require('../configs/httpCodes');
const restMethods = require('../configs/restMethods');
const routingConfig = require('../configs/routing');

class BaseController {
    #validationSchema;
    #validator;

    constructor(validator, validationSchema) {
        this.#validator = validator;
        this.#validationSchema = validationSchema;
    }

    execute(req, res, next) {
        let method = BaseController.#getRequestMethod(req.method, req.params);
        if (!method) {
            next(new Error(generalErrors.ACTION_NOT_SUPPORTED))
        }

        let data = {
            data: !isObjectEmpty(req.body) ? req.body : undefined,
            key: req.params[routingConfig.ID_PARAM_NAME],
            query: !isObjectEmpty(req.query) ? req.query : undefined
        };

        if (!this.#validator.isValid(this.#validationSchema[method], data)) {
            return next(new Error(this.#validator.getLastError()));
        }

        this[method](data)
            .then(response => res.status(httpCodes.OK).json(response))
            .catch(error => next(error))
    }

    static #getRequestMethod(method, params) {
        if (params[routingConfig.ID_PARAM_NAME]) {
            method += "_ID"
        }

        return restMethods[method];
    }

    index(data) {
        throw new Error(generalErrors.ACTION_NOT_SUPPORTED);
    }

    show(data) {
        throw new Error(generalErrors.ACTION_NOT_SUPPORTED);
    }

    store(data) {
        throw new Error(generalErrors.ACTION_NOT_SUPPORTED);
    }

    update(data) {
        throw new Error(generalErrors.ACTION_NOT_SUPPORTED);
    }

    destroy(data) {
        throw new Error(generalErrors.ACTION_NOT_SUPPORTED);
    }
}

function isObjectEmpty(object) {
    return typeof object === 'object' && object !== null && !Object.keys(object).length;
}

module.exports = BaseController;