const customValidationTypes = require('./types/customValidationTypes');

const storeProperties = {
    configName: customValidationTypes.configName,
    from: customValidationTypes.hash,
    to: customValidationTypes.hash,
    valueFrom: {type: "string"},
    valueTo: {type: "string"},
    gasFrom: {type: "integer"},
    gasTo:  {type: "integer"},
    gasPriceFrom: {type: "string"},
    gasPriceTo: {type: "string"}
};
const storeRequiredProperties = ['configName'];

module.exports = {
    index: {
        type: 'object',
        properties: {
            query: {
                type: 'object',
                properties: {},
                additionalProperties: false
            }
        },
        additionalProperties: false
    },
    show: {
        type: 'object',
        properties: {
            key: customValidationTypes.configName,
            query: {
                type: 'object',
                properties: {},
                additionalProperties: false
            },
        },
        required: ['key'],
        additionalProperties: false
    },
    store: {
        type: 'object',
        properties: {
            data: {
                type: 'object',
                properties: storeProperties,
                required: storeRequiredProperties,
                additionalProperties: false,
                minProperties: 2
            }
        },
        required: ['data'],
        additionalProperties: false
    },
    update: {
        type: 'object',
        properties: {
            key: customValidationTypes.configName
        },
        required: ['key'],
        additionalProperties: false
    },
    destroy: {
        type: 'object',
        properties: {
            key: customValidationTypes.configName
        },
        required: ['key'],
        additionalProperties: false
    },
    additionalProperties: false
};