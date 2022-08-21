const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Configuration', {
        configName: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        from: DataTypes.STRING,
        to: DataTypes.STRING,
        valueFrom: DataTypes.INTEGER,
        valueTo: DataTypes.INTEGER,
        gasFrom: DataTypes.INTEGER,
        gasTo:  DataTypes.INTEGER,
        gasPriceFrom: DataTypes.BIGINT,
        gasPriceTo: DataTypes.BIGINT
    });
};