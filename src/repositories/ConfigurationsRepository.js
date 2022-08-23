const BaseRepository = require('./BaseRepository');
const generalErrors = require('../../errors/generalErrors');
const {Op} = require('sequelize');

class ConfigurationsRepository extends BaseRepository {
    constructor(configuration, sequelize) {
        super(configuration, sequelize);
    }

    /**
     * Sets a configuration to be active by a given primary key
     * Sets the remaining configurations to isActive: false because only one configuration can be active at a time
     * @param {String} key
     * @returns {Promise<Object>}
     */
    setActiveConfiguration(key) {
        return this.sequelize.transaction()
            .then(t => {
                return super.updateByPk({isActive: true}, key)
                    .then(result => {
                        if (!result.updated) {
                            throw new Error(generalErrors.UPDATE_FAILED_$.replace('%s', key));
                        }
                    })
                    .then(() => this.#setOtherConfigurationsInactive(key))
                    .then(() => t.commit())
                    .then(() => ({updated: true}))
                    .catch(error => {
                        return t.rollback()
                            .then(() => {
                                throw error;
                            })
                    })

            })
    }

    /**
     * Retrieves the active configuration from DB
     * @returns {Promise<Model|null>} - returns null if one is not found
     */
    getActiveConfiguration() {
        return super.findOne({
            where: {
                isActive: true
            }
        })
    }

    /**
     * Will set the remaining configurations to isActive: false
     * @param {String} key
     * @returns {Promise<Object>}
     */
    #setOtherConfigurationsInactive(key) {
        return super.update({isActive: false}, {
            where: {
                [this.model.primaryKeyAttribute]: {
                    [Op.ne]: key
                }
            }
        })
    }
}

module.exports = ConfigurationsRepository;