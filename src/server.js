import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { connect } from './utils/db'
import postOfficeRouter from './resources/postoffice/postoffice.router'
import shipmentsRouter from './resources/shipments/shipments.router'

export const app = express()
const Logger = require('./utils/logger')(module)

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/postoffice', postOfficeRouter)
app.use('/api/shipments', shipmentsRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      Logger.info(`API Server started on http://localhost:${config.port}`)
    })
  } catch (e) {
    Logger.error('Error in starting the server', e)
  }
}
