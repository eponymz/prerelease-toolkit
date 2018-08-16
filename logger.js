const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, colorize, json } = format;

const customColors = {
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green'
  }
};

const logger = createLogger({
  format: combine(
    colorize(),
    label({ label: '[app-server]' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console({ colorize: process.stdout.isTTY, json: false })
  ]
});

module.exports = logger;
