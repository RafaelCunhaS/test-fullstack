import { Request, Response } from 'express'
import { HttpStatus } from '../../src/utils/HttpStatus'
import ClientController from '../../src/controller/ClientController'
import { IClientService } from '../../src/interfaces/IClient'
import { IClientInfo } from '../../src/interfaces/IClient'
import { Pagination, RequestPagination } from '../../src/interfaces/IPagination'
import Client from '../../src/database/models/ClientModel'
import { ZodError } from 'zod'

describe('ClientController', () => {
  let clientController: ClientController
  let clientService: IClientService
  let req: Request
  let res: Response

  beforeEach(() => {
    clientService = {
      create: jest.fn(),
      findAndCountAll: jest.fn(),
      update: jest.fn(),
      findByPk: jest.fn()
    }
    clientController = new ClientController(clientService)
    req = {} as Request
    res = {} as Response
  })

  describe('create', () => {
    it('should create a new client and return 201 status code', async () => {
      const clientData: IClientInfo = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '78385043098',
        phonenumber: '1234567891',
        status: 'Ativo'
      }
      req.body = clientData
      res.status = jest.fn().mockReturnValue(res)
      res.json = jest.fn().mockReturnValue(res)

      await clientController.create(req, res)

      expect(clientService.create).toHaveBeenCalledWith(clientData)
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
      expect(res.json).toHaveBeenCalledWith({ message: 'Client created' })
    })

    it('should throw a zod error if client data is invalid', async () => {
      const clientData: IClientInfo = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '123456789',
        phonenumber: '123456789',
        status: 'Ativo'
      }
      req.body = clientData
      res.status = jest.fn().mockReturnValue(res)
      res.json = jest.fn().mockReturnValue(res)

      await expect(clientController.create(req, res)).rejects.toThrow(ZodError)
    })
  })

  describe('findAndCountAll', () => {
    it('should find and count all clients and return 200 status code', async () => {
      const pagination: Pagination = { page: 1, size: 10 }
      const clients = { rows: [], count: 0 }
      let reqPagination: RequestPagination = {} as RequestPagination

      reqPagination.pagination = pagination
      res.status = jest.fn().mockReturnValue(res)
      res.json = jest.fn().mockReturnValue(res)

      clientService.findAndCountAll = jest.fn().mockResolvedValue(clients)

      await clientController.findAndCountAll(reqPagination, res)

      expect(clientService.findAndCountAll).toHaveBeenCalledWith(pagination)
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
      expect(res.json).toHaveBeenCalledWith({
        totalPages: 0,
        data: clients.rows
      })
    })
  })

  describe('update', () => {
    it('should update a client and return 200 status code', async () => {
      const clientId = 1
      const clientData: IClientInfo = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '78385043098',
        phonenumber: '1234567891',
        status: 'Ativo'
      }
      req.params = { id: clientId.toString() }
      req.body = clientData
      res.status = jest.fn().mockReturnValue(res)
      res.json = jest.fn().mockReturnValue(res)

      await clientController.update(req, res)

      expect(clientService.update).toHaveBeenCalledWith(clientId, clientData)
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
      expect(res.json).toHaveBeenCalledWith({ message: 'Client updated' })
    })

    it('should throw a zod error if client data is invalid', async () => {
      const clientId = 1
      const clientData: IClientInfo = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '123456789',
        phonenumber: '123456789',
        status: 'Ativo'
      }
      req.params = { id: clientId.toString() }
      req.body = clientData
      res.status = jest.fn().mockReturnValue(res)
      res.json = jest.fn().mockReturnValue(res)

      await expect(clientController.update(req, res)).rejects.toThrow(ZodError)
    })
  })

  describe('findByPk', () => {
    it('should find a client by primary key and return 200 status code', async () => {
      const clientId = 1
      const client: Pick<Client, 'id' | 'name' | 'email' | 'cpf' | 'phonenumber' | 'status'> = {
        id: clientId,
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '123456789',
        phonenumber: '123456789',
        status: 'Ativo'
      }
      req.params = { id: clientId.toString() }
      res.status = jest.fn().mockReturnValue(res)
      res.json = jest.fn().mockReturnValue(res)

      clientService.findByPk = jest.fn().mockResolvedValue(client)
      await clientController.findByPk(req, res)

      expect(clientService.findByPk).toHaveBeenCalledWith(clientId)
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
      expect(res.json).toHaveBeenCalledWith(client)
    })
  })
})
