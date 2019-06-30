import {
  getSuccessCallbackHandler,
  getExceptionCallbackHandler
} from '../utils'
import {
  STATUS_SUCCESS,
  STATUS_FAILURE,
  STATUS_DUPLICATE,
  BAD_REQUEST
} from '../constants'
const Logger = require('../utils/logger')(module)

export const getOne = model => async (req, res) => {
  try {
    const response = {}
    const doc = await model
      .findOne({ _id: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      response.status = STATUS_FAILURE
      response.errorCode = BAD_REQUEST
    } else {
      response.status = STATUS_SUCCESS
      response.data = doc
    }

    getSuccessCallbackHandler(req, res)(doc)
  } catch (e) {
    getExceptionCallbackHandler(req, res)(e)
  }
}

export const getMany = model => async (req, res) => {
  try {
    const docs = await model
      .find({})
      .lean()
      .exec()
    let responseObject = {
      status: STATUS_SUCCESS,
      data: docs
    }
    getSuccessCallbackHandler(req, res)(responseObject)
  } catch (e) {
    getExceptionCallbackHandler(req, res)(e)
  }
}

export const createOne = (model, type) => {
  return async (req, res) => {
    const response = {}
    try {
      if (type === 'postoffice') {
        const data = await model
          .findOne({ zipcode: req.body.zipcode })
          .lean()
          .exec()
        if (data) {
          response.status = STATUS_FAILURE
          response.errorCode = STATUS_DUPLICATE
          getSuccessCallbackHandler(req, res)(response)
          return
        }
      }
      req.body.trackingId = 'DES' + new Date().getTime()
      Logger.info('REQUEST BODY:::', req.body)
      const doc = await model.create({ ...req.body })
      response.status = STATUS_SUCCESS
      response.data = doc
      getSuccessCallbackHandler(req, res)(response)
    } catch (e) {
      getExceptionCallbackHandler(req, res)(e)
    }
  }
}

export const updateOne = model => {
  return async (req, res) => {
    try {
      const response = {}
      const updatedDoc = await model
        .findOneAndUpdate(
          {
            _id: req.params.id
          },
          req.body,
          { new: true }
        )
        .lean()
        .exec()

      if (!updatedDoc) {
        response.status = STATUS_FAILURE
        response.errorCode = BAD_REQUEST
      } else {
        response.status = STATUS_SUCCESS
        response.data = updatedDoc
      }

      getSuccessCallbackHandler(req, res)(response)
    } catch (e) {
      getExceptionCallbackHandler(req, res)(e)
    }
  }
}

export const removeOne = model => async (req, res) => {
  let response = {}
  try {
    const removed = await model.findOneAndRemove({
      _id: req.params.id
    })

    if (!removed) {
      response.status = STATUS_FAILURE
      response.errorCode = BAD_REQUEST
    } else {
      response.status = STATUS_SUCCESS
      response.data = removed
    }
    getSuccessCallbackHandler(req, res)(response)
  } catch (e) {
    getExceptionCallbackHandler(req, res)(e)
  }
}

export const crudControllers = (model, type) => ({
  removeOne: removeOne(model, type),
  updateOne: updateOne(model, type),
  getMany: getMany(model, type),
  getOne: getOne(model, type),
  createOne: createOne(model, type)
})
