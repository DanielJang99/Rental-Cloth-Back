const appRoot = require("app-root-path");
const winston = require("winston");
require("winston-daily-rotate-file");

const transport = new winston.transports.DailyRotateFile({
    filename: `${appRoot}/src/logs/%DATE%.log`,
    maxsize: 1024,
    datePatten: "YYYY-MM-DD-HH",
    timestamp: function () {
        return Date.now();
    },
});
let logger = winston.createLogger({
    transports: [transport],
});
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};
module.exports = logger;
