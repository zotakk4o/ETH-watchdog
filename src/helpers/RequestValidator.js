const Ajv = require("ajv");

class RequestValidator {
    #lastErrors;
    #validator;

    constructor() {
        this.#validator = new Ajv();
    }

    isValid(schema, data) {
        let isValid = this.#validator.validate(schema, data);
        this.#lastErrors = this.#validator.errors;
        return isValid;
    }

    getLastError() {
        let err = this.#lastErrors[this.#lastErrors.length - 1];
        return err.message + ' ' +JSON.stringify(err.params);
    }
}

module.exports = RequestValidator;