const BaseService = require('./BaseService');

class ConfigurationsService extends BaseService {
    constructor(configurationsRepository) {
        super(configurationsRepository);
    }
}

module.exports = ConfigurationsService;