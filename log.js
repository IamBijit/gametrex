'use strict';

const winston = require('winston');

module.exports = new winston.createLogger({
  level: process.env.LOGGING_LEVEL || 'info',
  transports: [
    new (winston.transports.Console)(),
  ],
});
