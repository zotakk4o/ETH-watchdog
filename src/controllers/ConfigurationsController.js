const BaseController = require('./BaseController');

class ConfigurationsController extends BaseController{
    constructor(requestValidator, configurationsValidationSchema) {
        super(requestValidator, configurationsValidationSchema);
    }

    index(data) {
        return Promise.resolve(data);
    }

    show(data) {
        return Promise.resolve(data);
    }

    store(data) {
        return Promise.resolve(data);
    }

    destroy(data) {
        return Promise.resolve(data);
    }
}

module.exports = ConfigurationsController;