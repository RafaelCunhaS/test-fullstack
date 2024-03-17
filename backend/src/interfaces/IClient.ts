import type Client from '../database/models/ClientModel'
import { type Pagination } from './IPagination'

export interface IClientInfo {
  name: string
  email: string
  cpf: string
  phonenumber: string
  status: 'Ativo' | 'Inativo' | 'Aguardando ativação' | 'Desativado'
}

export interface IClientModel {
  findAndCountAll: (pagination: Pagination | undefined) => Promise<{
    rows: Client[]
    count: number
  }>
  findByCpf: (cpf: string) => Promise<Client | null>
  findByPk: (id: number) => Promise<Client | null>
  create: (clientData: IClientInfo) => Promise<Client>
  update: (id: number, clientData: IClientInfo) => Promise<void>
}

export interface IClientService {
  findAndCountAll: (pagination: Pagination | undefined) => Promise<{
    rows: Client[]
    count: number
  }>
  findByPk: (id: number) => Promise<Client>
  create: (clientData: IClientInfo) => Promise<void>
  update: (id: number, clientData: IClientInfo) => Promise<void>
}
