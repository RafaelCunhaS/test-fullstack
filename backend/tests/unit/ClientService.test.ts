import ClientService from '../../src/service/ClientService'
import { IClientModel } from '../../src/interfaces/IClient'
import { IClientInfo } from '../../src/interfaces/IClient'
import BadRequest from '../../src/errors/BadRequest'
import NotFound from '../../src/errors/NotFound'
import { Pagination } from '../../src/interfaces/IPagination'
import Client from '../../src/database/models/ClientModel'

describe('ClientService', () => {
  let clientService: ClientService
  let mockModel: IClientModel
  const mockedClient: Pick<Client, 'id' | 'name' | 'email' | 'cpf' | 'phonenumber' | 'status' | 'createdAt'> = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    cpf: '123456789',
    phonenumber: '123456789',
    status: 'Ativo',
    createdAt: new Date()
  }

  beforeEach(() => {
    mockModel = {
      findByCpf: jest.fn(),
      create: jest.fn(),
      findAndCountAll: jest.fn(),
      update: jest.fn(),
      findByPk: jest.fn()
    }
    clientService = new ClientService(mockModel)
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

      jest.spyOn(mockModel, 'findByCpf').mockResolvedValue(null)
      jest.spyOn(mockModel, 'create').mockResolvedValue(mockedClient as Client)

      await clientService.create(clientData)

      expect(mockModel.findByCpf).toHaveBeenCalledWith(clientData.cpf)
      expect(mockModel.create).toHaveBeenCalledWith(clientData)
    })

    it('should throw BadRequest error if CPF is already registered', async () => {
      const clientData: IClientInfo = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '123456789',
        phonenumber: '123456789',
        status: 'Ativo'
      }

      jest.spyOn(mockModel, 'findByCpf').mockResolvedValue(mockedClient as Client)

      await expect(clientService.create(clientData)).rejects.toThrow(BadRequest)
    })
  })

  describe('findAndCountAll', () => {
    it('should find and count all clients with pagination', async () => {
      const pagination: Pagination = { page: 1, size: 10 }
      const expectedResult = { rows: [], count: 0 }

      jest.spyOn(mockModel, 'findAndCountAll').mockResolvedValue(expectedResult)

      const result = await clientService.findAndCountAll(pagination)

      expect(mockModel.findAndCountAll).toHaveBeenCalledWith(pagination)
      expect(result).toEqual(expectedResult)
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

      jest.spyOn(clientService, 'findByPk').mockResolvedValue(mockedClient as Client)

      jest.spyOn(mockModel, 'findByCpf').mockResolvedValue(null)
      jest.spyOn(mockModel, 'update').mockResolvedValue(undefined)

      await clientService.update(id, clientData)

      expect(clientService.findByPk).toHaveBeenCalledWith(id)
      expect(mockModel.findByCpf).toHaveBeenCalledWith(clientData.cpf)
      expect(mockModel.update).toHaveBeenCalledWith(id, clientData)
    })

    it('should throw BadRequest error if CPF is already registered by another client', async () => {
      const id = 1
      const clientData: IClientInfo = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '123456789',
        phonenumber: '123456789',
        status: 'Ativo'
      }
      const mockedClient2: Pick<Client, 'id' | 'name' | 'email' | 'cpf' | 'phonenumber' | 'status'> = {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
        cpf: '123456789',
        phonenumber: '123456789',
        status: 'Ativo'
      }

      jest.spyOn(clientService, 'findByPk').mockResolvedValue(mockedClient as Client)
      jest.spyOn(mockModel, 'findByCpf').mockResolvedValue(mockedClient2 as Client)

      await expect(clientService.update(id, clientData)).rejects.toThrow(BadRequest)
    })
  })

  describe('findByPk', () => {
    it('should find a client by primary key', async () => {
      const id = 1

      jest.spyOn(mockModel, 'findByPk').mockResolvedValue(mockedClient as Client)

      const result = await clientService.findByPk(id)

      expect(mockModel.findByPk).toHaveBeenCalledWith(id)
      expect(result).toEqual(mockedClient as Client)
    })

    it('should throw NotFound error if client is not found', async () => {
      const id = 1

      jest.spyOn(mockModel, 'findByPk').mockResolvedValue(null)

      await expect(clientService.findByPk(id)).rejects.toThrow(NotFound)
    })
  })
})
