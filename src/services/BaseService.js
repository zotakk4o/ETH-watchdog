class BaseService {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    /**
     * Find all entities
     * @param query
     * @returns {Promise<Model[]> | Promise<Model[]>}
     */
    findAllEntities(query) {
        return this.#repository.findAll(query);
    }

    /**
     * Retrieves from DB an entity by a given key
     * @param {String} key
     * @returns {Promise<Model>}
     */
    findEntityByPK(key) {
        return this.#repository.findByPk(key);
    }

    /**
     * Stores an entity in DB
     * @param {Object} data
     * @returns {Promise<Model[]>}
     */
    createEntity(data) {
        return this.#repository.create(data);
    }

    /**
     * updates an entity in the DB by a given primary key and data
     * @param {Object} data
     * @param {String} key
     * @returns {Promise<Object>}
     */
    updateEntityByPk(data, key) {
        return this.#repository.updateByPk(data, key);
    }

    /**
     * deletes an entity in the DB by a given primary key
     * @param {String} key
     * @returns {Promise<Object>}
     */
    deleteEntityByPk(key) {
        return this.#repository.deleteByPk(key);
    }

    get repository() {
        return this.#repository;
    }
}

module.exports = BaseService;