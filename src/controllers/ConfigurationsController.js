const BaseController = require('./BaseController');

class ConfigurationsController extends BaseController{
    constructor(requestValidator, configurationsValidationSchema, configurationsService, controllersConfig) {
        super(
            requestValidator,
            configurationsValidationSchema,
            configurationsService,
            controllersConfig.ConfigurationsController
        );
    }

    update(data) {
        let updateData = {isActive: true};
        return this.#service.updateEntityByPk(updateData, data.key);
    }
}

module.exports = ConfigurationsController;