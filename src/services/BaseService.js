class BaseService {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    findAllEntities(query) {
        return this.#repository.findAll(query);
    }

    findEntityByPK(key) {
        return this.#repository.findByPk(key);
    }

    createEntity(data) {
        return this.#repository.create(data);
    }

    updateEntityByPk(data, key) {
        return this.#repository.updateByPk(data, key);
    }

    deleteEntityByPk(key) {
        return this.#repository.deleteByPk(key);
    }
}

module.exports = BaseService;