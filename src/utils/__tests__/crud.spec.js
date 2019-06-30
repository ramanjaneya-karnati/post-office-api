// eslint-disable-next-line no-unused-vars
import { getOne, getMany, createOne, updateOne, removeOne } from '../crud'
import { PostOffice } from '../../resources/postoffice/postoffice.model'
// import { Shipping } from '../../resources/shipping/shipping.model'
// eslint-disable-next-line no-unused-vars
import mongoose from 'mongoose'

describe('crud controllers', () => {
  describe('getOneRecord', async () => {
    test('Retrieve the single record', async () => {
      expect.assertions(1)
      const list = await PostOffice.create({
        _id: mongoose.Types.ObjectId(),
        name: 'Santiago Loscondes',
        zipcode: 523245
      })

      const req = {
        params: {
          id: list._id
        }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(result) {
          expect(result.name).toBe('Santiago Loscondes')
        }
      }

      await getOne(PostOffice)(req, res)
    })
  })

  describe('getAllRecords', () => {
    test('Retrieve all the records', async () => {
      expect.assertions(1)

      await PostOffice.create([
        { name: 'Santiago', zipcode: 43423432 },
        { name: 'La Moneda', zipcode: 424343 },
        { name: 'Pucon', zipcode: 64535435 }
      ])
      const req = {}

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(result) {
          expect(result.data.length).toBe(3)
        }
      }

      await getMany(PostOffice)(req, res)
    })
  })

  describe('createOneRecord', () => {
    test('creates a new doc', async () => {
      expect.assertions(1)

      const body = { name: 'pukon', zipcode: 755000 }

      const req = {
        body
      }

      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        json(results) {
          expect(results.data.name).toBe(body.name)
        }
      }

      await createOne(PostOffice)(req, res)
    })
  })

  describe('updateOneRecord', () => {
    test('update the document based on id', async () => {
      expect.assertions(2)

      const list = await PostOffice.create({
        _id: mongoose.Types.ObjectId(),
        name: 'la moneda',
        zipcode: 755600
      })
      const update = { name: 'pedro de valdivia', zipcode: 567000 }

      const req = {
        params: { id: list._id },
        body: update
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(results) {
          expect(`${results.data._id}`).toBe(`${list._id}`)
          expect(results.data.name).toBe(update.name)
        }
      }

      await updateOne(PostOffice)(req, res)
    })

    test('400 if no doc', async () => {
      expect.assertions(1)

      const update = { name: 'la moneda' }

      const req = {
        params: { id: mongoose.Types.ObjectId() },
        body: update
      }

      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        json(results) {
          expect(`${results.data}`).toBe('undefined')
        }
      }

      await updateOne(PostOffice)(req, res)
    })
  })

  describe('removeOneRecord', () => {
    test('first doc by authenticated user and id to remove', async () => {
      expect.assertions(1)

      const list = await PostOffice.create({
        _id: mongoose.Types.ObjectId(),
        name: 'la moneda',
        zipcode: 2550000
      })

      const req = {
        params: { id: list._id }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(results) {
          expect(`${results.data}`).toBe('undefined')
        }
      }

      await removeOne(PostOffice)(req, res)
    })

    test('400 if no doc', async () => {
      expect.assertions(1)

      const req = {
        params: { id: mongoose.Types.ObjectId() }
      }

      const res = {
        status(status) {
          expect(status).toBe(400)
          return this
        },
        json(results) {
          expect(`${results.data}`).toBe('undefined')
        }
      }

      await removeOne(PostOffice)(req, res)
    })
  })
})
