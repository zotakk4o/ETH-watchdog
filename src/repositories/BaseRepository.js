class BaseRepository {
    #model;
    #sequelize;

    constructor(model, sequelize) {
        this.#model = model;
        this.#sequelize = sequelize;
    }

    /**
     * Retrieves from DB an entity by a given key
     * @param {String} key
     * @returns {Promise<Model>}
     */
    findByPk(key) {
        return this.#model.findByPk(key);
    }

    /**
     * Retrieves from DB an entity by a given query
     * @param {Object} query
     * @returns {Promise<Model>}
     */
    findOne(query) {
        return this.#model.findOne(query);
    }

    /**
     * Retrieves from DB all entities by a given query
     * @param {String} query
     * @returns {Promise<Model[]>}
     */
    findAll(query) {
        return this.#model.findAll(query);
    }

    /**
     * Stores an entity in DB
     * @param {Object} data
     * @returns {Promise<Model[]>}
     */
    create(data) {
        return this.#model.create(data);
    }

    /**
     * updates an entity in the DB by a given primary key and data
     * @param {Object} data
     * @param {String} key
     * @returns {Promise<Object>}
     */
    updateByPk(data, key) {
        return this.#model.update(data, {
            where: {
                [this.#model.primaryKeyAttribute]: key
            }
        })
            .then(result => ({updated: !!result[0]}));
    }

    /**
     * updates an entity in the DB by a given primary key
     * @param {Object} data
     * @param {Object} criteria
     * @returns {Promise<Object>}
     */
    update(data, criteria) {
        return this.#model.update(data, criteria);
    }

    /**
     * deletes an entity in the DB by a given primary key
     * @param {String} key
     * @returns {Promise<Object>}
     */
    deleteByPk(key) {
        return this.#model.destroy({
            where: {
                [this.#model.primaryKeyAttribute] : key
            }
        })
            .then(result => ({deleted: !!result}))
    }

    get model() {
        return this.#model;
    }

    get sequelize() {
        return this.#sequelize;
    }
}

module.exports = BaseRepository;