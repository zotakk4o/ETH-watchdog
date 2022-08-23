const BaseController = require('./BaseController');

class ConfigurationsController extends BaseController{
    #ethWatcher;

    constructor(requestValidator, configurationsValidationSchema, configurationsService, controllersConfig, ethWatcher) {
        super(
            requestValidator,
            configurationsValidationSchema,
            configurationsService,
            controllersConfig.ConfigurationsController
        );

        this.#ethWatcher = ethWatcher;
    }

    /**
     * The update method for this API will only set a configuration as active
     * @param data
     * @returns {Promise}
     */
    update(data) {
        let finalRes;
        return this.service.setActiveConfiguration(data.key)
            .then(result => {
                finalRes = result;
                if (!this.#ethWatcher.isSubscribed()) {
                    return this.#ethWatcher.subscribe();
                }

                return this.service.findEntityByPK(data.key)
                    .then(configuration => {this.#ethWatcher.configuration = configuration});
            })
            .then(() => finalRes);
    }
}

module.exports = ConfigurationsController;