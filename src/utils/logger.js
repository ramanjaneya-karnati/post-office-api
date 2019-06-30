var winston = require('winston')
require('winston-daily-rotate-file')

var getLabel = function(callingModule) {
  var parts = callingModule.filename.split('/')
  const returnString = parts[parts.length - 2] + '/' + parts.pop()
  return returnString
}

module.exports = function(callingModule) {
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        label: getLabel(callingModule),
        json: false,
        timestamp: true,
        depth: true,
        colorize: true,
        level: 'debug'
      }),
      new winston.transports.DailyRotateFile({
        filename: './logs/logs.log',
        datePattern: 'DD-MM-YYYY',
        prepend: false,
        label: getLabel(callingModule),
        timestamp: true,
        depth: true,
        level: 'debug'
      })
    ]
  })
}
