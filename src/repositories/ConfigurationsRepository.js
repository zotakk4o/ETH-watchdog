const BaseRepository = require('./BaseRepository');

class ConfigurationsRepository extends BaseRepository {
    constructor(configuration) {
        super(configuration);
    }
}

module.exports = ConfigurationsRepository;