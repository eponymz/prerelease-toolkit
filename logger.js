const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(label({ label: 'LOGS' }), timestamp(), prettyPrint()),
  transports: [new transports.Console()]
});

module.exports = logger;
