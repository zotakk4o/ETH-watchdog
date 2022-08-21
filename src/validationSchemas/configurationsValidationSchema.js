const key = {type: "integer"};

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
    store: {
        type: 'object',
        properties: {
            data: {
                type: 'object',
                properties: {},
                required: [],
                additionalProperties: false
            }
        },
        required: ['data'],
        additionalProperties: false
    },
    destroy: {
        type: 'object',
        properties: {
            key: key
        },
        required: ['key'],
        additionalProperties: false
    },
    additionalProperties: false
};