import request from 'supertest'
import app from '../../src/app'
import sequelize from '../../src/database/models/index'

describe('Client Integration Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a new client', async () => {
    const response = await request(app).post('/clients').send({
      name: 'John Doe',
      cpf: '78385043098',
      email: 'johndoe@example.com',
      phonenumber: '1234567891',
      status: 'Ativo'
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message', 'Client created')
  })

  it('should return all clients by page and size', async () => {
    const response = await request(app).get('/clients?page=1&size=10')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('totalPages')
    expect(response.body).toHaveProperty('data')
  })

  it('should update a client', async () => {
    const response = await request(app).put('/clients/1').send({
      name: 'John Doe',
      cpf: '51399219014',
      email: 'johndoe@example.com',
      phonenumber: '1234567891',
      status: 'Inativo'
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Client updated')
  })

  it('should return a client by id', async () => {
    const response = await request(app).get('/clients/1')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('cpf')
    expect(response.body).toHaveProperty('email')
  })
})
