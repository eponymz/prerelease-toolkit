const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, colorize, printf, splat, json } = format;

const myFormat = printf(info => {
  return `${info.timestamp} ${info.label} ${info.level}: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    colorize(),
    label({ label: '[app-server]' }),
    timestamp(),
    splat(),
    myFormat
  ),
  transports: [new transports.Console()]
});

module.exports = logger;
