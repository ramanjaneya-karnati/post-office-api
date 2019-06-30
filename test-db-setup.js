import mongoose from 'mongoose'
import _ from 'lodash'
import { PostOffice } from './src/resources/postoffice/postoffice.model'
import { Shipments } from './src/resources/shipments/shipments.model'

const models = { PostOffice, Shipments }

const url =
  process.env.MONGODB_URI ||
  process.env.DB_URL ||
  'mongodb://<db_user>:<db_password>@ds123844.mlab.com:23844/postoffice_test'
global.newId = () => {
  return mongoose.Types.ObjectId()
}

const remove = collection => {
  return new Promise((resolve, reject) => {
    collection.remove(err => {
      if (err) return reject(err)
      resolve()
    })
  })
}
beforeEach(async done => {
  function clearDB() {
    return Promise.all(_.map(mongoose.connection.collections, c => remove(c)))
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(
        url,
        {
          useNewUrlParser: true,
          autoIndex: true
        }
      )
      await clearDB()
      await Promise.all(Object.keys(models).map(name => models[name].init()))
    } catch (e) {
      throw e
    }
  } else {
    await clearDB()
  }
  done()
})
afterEach(async done => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
  return done()
})
afterAll(done => {
  return done()
})
