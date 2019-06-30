import request from 'supertest'
import { app } from '../server'

describe('Server Startup', () => {
  test('api should be ready', async () => {
    let response = await request(app).get('/api/postoffice')
    expect(response.statusCode).toBe(200)

    response = await request(app).get('/api/shipments')
    expect(response.statusCode).toBe(200)
  })
})
