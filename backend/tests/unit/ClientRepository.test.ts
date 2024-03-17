import ClientRepository from '../../src/repository/ClientRepository'
import { IClientInfo } from '../../src/interfaces/IClient'
import Client from '../../src/database/models/ClientModel'
import { Pagination } from '../../src/interfaces/IPagination'

jest.mock('../../src/database/models/ClientModel', () => ({
  create: jest.fn(),
  findAndCountAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn()
}))

describe('ClientRepository', () => {
  let clientRepository: ClientRepository
  const mockedClient: Pick<Client, 'id' | 'name' | 'email' | 'cpf' | 'phonenumber' | 'status' | 'createdAt'> = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    cpf: '123456789',
    phonenumber: '123456789',
    status: 'Ativo',
    createdAt: new Date()
  }
  const mockedClientArray: Pick<Client, 'id' | 'name' | 'email' | 'cpf' | 'phonenumber' | 'status' | 'createdAt'>[] = [
    mockedClient
  ]

  beforeEach(() => {
    clientRepository = new ClientRepository()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a new client', async () => {
      const clientData: IClientInfo = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '123456789',
        phonenumber: '123456789',
        status: 'Ativo'
      }

      ;(Client.create as jest.Mock).mockResolvedValue(mockedClient)

      const result = await clientRepository.create(clientData)

      expect(Client.create).toHaveBeenCalledWith(clientData)
      expect(result).toEqual(mockedClient)
    })
  })

  describe('findAndCountAll', () => {
    it('should find and count all clients with pagination', async () => {
      const pagination: Pagination = { page: 1, size: 10 }
      const count = 1

      ;(Client.findAndCountAll as jest.Mock).mockResolvedValue({ rows: mockedClientArray, count })

      const result = await clientRepository.findAndCountAll(pagination)

      expect(Client.findAndCountAll).toHaveBeenCalledWith({
        limit: pagination.size,
        offset: pagination.page * pagination.size
      })
      expect(result).toEqual({ rows: mockedClientArray, count })
    })

    it('should find and count all clients without pagination', async () => {
      const count = 1

      ;(Client.findAndCountAll as jest.Mock).mockResolvedValue({ rows: mockedClientArray, count })

      const result = await clientRepository.findAndCountAll(undefined)

      expect(Client.findAndCountAll).toHaveBeenCalledWith({ limit: 5, offset: 0 })
      expect(result).toEqual({ rows: mockedClientArray, count })
    })
  })

  describe('findByPk', () => {
    it('should find a client by primary key', async () => {
      const id = 1

      ;(Client.findByPk as jest.Mock).mockResolvedValue(mockedClient)

      const result = await clientRepository.findByPk(id)

      expect(Client.findByPk).toHaveBeenCalledWith(id)
      expect(result).toEqual(mockedClient)
    })
  })

  describe('update', () => {
    it('should update a client', async () => {
      const id = 1
      const clientData: IClientInfo = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '123456789',
        phonenumber: '123456789',
        status: 'Ativo'
      }

      await clientRepository.update(id, clientData)

      expect(Client.update).toHaveBeenCalledWith(clientData, { where: { id } })
    })
  })

  describe('findByCpf', () => {
    it('should find a client by CPF', async () => {
      const cpf = '123456789'

      ;(Client.findOne as jest.Mock).mockResolvedValue(mockedClient)

      const result = await clientRepository.findByCpf(cpf)

      expect(Client.findOne).toHaveBeenCalledWith({ where: { cpf } })
      expect(result).toEqual(mockedClient)
    })
  })
})
