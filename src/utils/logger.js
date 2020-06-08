import { createLogger, format, transports } from 'winston';
const { label, combine, timestamp, prettyPrint, printf, colorize } = format;
const util = require('util');
import WinstonGraylog2 from 'winston-graylog2';
import config from '../config';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

const allTransports = [
  new transports.File({
    filename: './info.log',
    handleExceptions: true,
    json: true,
    level: 'info'
  }),
  new transports.File({
    filename: './error.log',
    handleExceptions: true,
    json: true,
    level: 'error'
  }),
  new transports.Console({
    level: 'info',
    handleExceptions: true,
    format: format.simple(),
    colorize: true
  })
];

// if (config.isProd || config.isStage) {
//   allTransports.push(
//     new WinstonGraylog2({
//       name: 'Graylog',
//       level: 'info',
//       silent: false,
//       handleExceptions: true,
//       graylog: {
//         servers: [{ host: config.graylog.host, port: config.graylog.port }],
//         hostname: 'node-boilerplate',
//         facility: 'node',
//         bufferSize: 1400
//       },
//       staticMeta: { env: config.env }
//     })
//   );
// }

const logger = createLogger({
  transports: allTransports
});

// create a stream object with a 'write' function that will be used by `morgan`.
logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

logger.combinedFormat = function(err, req, res) {
  // Similar combined format in morgan
  // :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
  return `${req.ip} - - [${new Date()}] \"${req.method} ${
    req.originalUrl
  } HTTP/${req.httpVersion}\" ${err.status || 500} - ${
    req.headers['user-agent']
  } -${err}`;
};

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new transports.Console({
//       format: format.simple()
//     })
//   );
// }

export default logger;
