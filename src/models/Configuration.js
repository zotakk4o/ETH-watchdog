const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Configuration', {
        configName: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        from: DataTypes.STRING,
        to: DataTypes.STRING,
        valueFrom: DataTypes.STRING,
        valueTo: DataTypes.STRING,
        gasFrom: DataTypes.BIGINT,
        gasTo:  DataTypes.BIGINT,
        gasPriceFrom: DataTypes.STRING,
        gasPriceTo: DataTypes.STRING,
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {createdAt: false, updatedAt: false});
};