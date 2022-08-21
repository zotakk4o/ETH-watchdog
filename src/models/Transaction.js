const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Transaction', {
        hash: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        nonce: DataTypes.INTEGER,
        blockHash: DataTypes.STRING,
        blockNumber: DataTypes.INTEGER,
        transactionIndex: DataTypes.INTEGER,
        from: DataTypes.STRING,
        to: DataTypes.STRING,
        value: DataTypes.DECIMAL,
        gas: DataTypes.INTEGER,
        gasPrice: DataTypes.BIGINT,
        input: DataTypes.STRING,
        configName: {
            type: DataTypes.STRING,
            references: {
                model: 'Configurations',
                key: 'configName'
            }
        }
    });
};