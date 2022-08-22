const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Configuration', {
        configName: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        from: DataTypes.STRING,
        to: DataTypes.STRING,
        valueFrom: DataTypes.DECIMAL,
        valueTo: DataTypes.DECIMAL,
        gasFrom: DataTypes.DECIMAL,
        gasTo:  DataTypes.DECIMAL,
        gasPriceFrom: DataTypes.DECIMAL,
        gasPriceTo: DataTypes.DECIMAL,
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
};