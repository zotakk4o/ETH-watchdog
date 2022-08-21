const { createLogger, format, transports } = require('winston');
const { combine, timestamp, splat, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    timestamp = timestamp.split('T');
    timestamp = timestamp.join(' ');
    timestamp = timestamp.slice(0, 19);
    return `${timestamp} ${level}: ${message}`;
});

module.exports = (config) => {
    return createLogger({
        format: combine(
            timestamp(),
            splat(),
            myFormat
        ),
        transports: [new transports.File({ filename: config.LOG_FILE_PATH })]
    });
};