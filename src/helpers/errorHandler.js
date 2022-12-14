const httpCodes = require('../configs/httpCodes');

module.exports = (logger) => {
    return function (err, req, res, next) {
        let error = {
            error: err.message,
        };

        logger.error(JSON.stringify(error));
        res.status(httpCodes.BAD_REQUEST).json(error);
    };
};