const BaseService = require('./BaseService');

class ConfigurationsService extends BaseService {
    constructor(configurationsRepository) {
        super(configurationsRepository);
    }

    /**
     * Sets a configuration to be active by a given primary key
     * Sets the remaining configurations to isActive: false because only one configuration can be active at a time
     * @param {String} key
     * @returns {Promise<Object>}
     */
    setActiveConfiguration(key) {
        return this.repository.setActiveConfiguration(key);
    }

    /**
     * Retrieves the active configuration from DB
     * @returns {Promise<Model|null>} - returns null if one is not found
     */
    getActiveConfiguration() {
        return this.repository.getActiveConfiguration();
    }
}

module.exports = ConfigurationsService;