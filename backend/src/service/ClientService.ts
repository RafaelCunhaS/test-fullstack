import BadRequest from '../errors/BadRequest'
import NotFound from '../errors/NotFound'
import { type IClientModel, type IClientService, type IClientInfo } from '../interfaces/IClient'
import type Client from '../database/models/ClientModel'
import { type Pagination } from '../interfaces/IPagination'

export default class ClientService implements IClientService {
  constructor(private readonly _model: IClientModel) {}

  async create(clientData: IClientInfo): Promise<void> {
    const client = await this._model.findByCpf(clientData.cpf)
    if (client != null) {
      throw new BadRequest('CPF already registered')
    }

    await this._model.create(clientData)
  }

  async findAndCountAll(pagination: Pagination | undefined): Promise<{
    rows: Client[]
    count: number
  }> {
    return await this._model.findAndCountAll(pagination)
  }

  async update(id: number, clientData: IClientInfo): Promise<void> {
    const { id: returnedId } = await this.findByPk(id)

    const client = await this._model.findByCpf(clientData.cpf)
    if (client != null && returnedId !== client.id) {
      throw new BadRequest('CPF already registered')
    }

    await this._model.update(id, clientData)
  }

  async findByPk(id: number): Promise<Client> {
    const client = await this._model.findByPk(id)
    if (client == null) {
      throw new NotFound('Client not found')
    }

    return client
  }
}
