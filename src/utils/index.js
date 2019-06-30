import { STATUS_FAILURE, EC_TECHNICAL_ERROR } from '../constants'
const Logger = require('../utils/logger')(module)

export function getSuccessCallbackHandler(req, res) {
  return function(data) {
    Logger.debug('Sending response to caller: ', JSON.stringify(data))
    res.json(data)
    Logger.debug('The invocation of service ' + req.originalUrl + ' completed')
  }
}

export function getExceptionCallbackHandler(req, res) {
  return function(exception) {
    Logger.debug('exception while processing request :: ', exception)
    res.json({
      status: STATUS_FAILURE,
      errorCode: EC_TECHNICAL_ERROR,
      errorMessage: exception.message
    })
    Logger.debug('The invocation of service ' + req.originalUrl + ' completed')
  }
}
