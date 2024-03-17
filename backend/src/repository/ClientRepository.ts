import Client from '../database/models/ClientModel'
import { type IClientInfo, type IClientModel } from '../interfaces/IClient'
import { type Pagination } from '../interfaces/IPagination'

export default class ClientRepository implements IClientModel {
  constructor(private readonly _model = Client) {}

  async create(clientData: IClientInfo): Promise<Client> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await this._model.create(clientData as any)
  }

  async findAndCountAll(pagination: Pagination | undefined): Promise<{
    rows: Client[]
    count: number
  }> {
    const { page, size } = pagination ?? { page: 0, size: 5 }
    const result = await this._model.findAndCountAll({ limit: size, offset: page * size })
    return result
  }

  async findByPk(id: number): Promise<Client | null> {
    return await this._model.findByPk(id)
  }

  async update(id: number, clientData: IClientInfo): Promise<void> {
    await this._model.update(clientData, { where: { id } })
  }

  async findByCpf(cpf: string): Promise<Client | null> {
    return await this._model.findOne({ where: { cpf } })
  }
}
