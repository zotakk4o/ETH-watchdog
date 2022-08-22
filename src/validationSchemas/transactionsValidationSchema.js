const customValidationTypes = require('./types/customValidationTypes');
const key = customValidationTypes.hash;
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
            key: key,
            query: {
                type: 'object',
                properties: {},
                additionalProperties: false
            },
        },
        required: ['key'],
        additionalProperties: false
    },
    additionalProperties: false
};