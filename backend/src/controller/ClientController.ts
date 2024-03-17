import { type Request, type Response } from 'express'
import { type IClientInfo, type IClientService } from '../interfaces/IClient'
import { clientSchema } from './schemas/ClientSchema'
import { type RequestPagination } from '../interfaces/IPagination'
import { HttpStatus } from '../utils/HttpStatus'

export default class ClientController {
  constructor(private readonly _ClientService: IClientService) {}

  async create(req: Request, res: Response): Promise<Response> {
    clientSchema.parse(req.body)
    await this._ClientService.create(req.body as IClientInfo)

    return res.status(HttpStatus.CREATED).json({ message: 'Client created' })
  }

  async findAndCountAll(req: RequestPagination, res: Response): Promise<Response> {
    const clients = await this._ClientService.findAndCountAll(req.pagination)

    const totalPages = req.pagination != null ? Math.ceil(clients.count / req.pagination.size) : 0

    return res.status(HttpStatus.OK).json({
      totalPages,
      data: clients.rows
    })
  }

  async update(req: Request, res: Response): Promise<Response> {
    clientSchema.parse(req.body)
    await this._ClientService.update(parseInt(req.params.id), req.body as IClientInfo)

    return res.status(HttpStatus.OK).json({ message: 'Client updated' })
  }

  async findByPk(req: Request, res: Response): Promise<Response> {
    const client = await this._ClientService.findByPk(parseInt(req.params.id))

    return res.status(HttpStatus.OK).json(client)
  }
}
