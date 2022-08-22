class BaseRepository {
    #model;

    constructor(model) {
        this.#model = model;
    }

    findByPk(key) {
        return this.#model.findByPk(key);
    }

    findAll(query) {
        return this.#model.findAll(query);
    }

    create(data) {
        return this.#model.create(data);
    }

    updateByPk(data, key) {
        this.#model.update(data, {
            where: {
                [this.#model.primaryKeyAttribute]: key
            }
        });
    }

    deleteByPk(key) {
        return this.#model.destroy({
            where: {
                [this.#model.primaryKeyAttribute] : key
            }
        })
            .then(result => {return {deleted: !!result}});
    }
}

module.exports = BaseRepository;