import { type Request } from 'express'

export interface Pagination {
  page: number
  size: number
}

export interface RequestPagination extends Request {
  pagination?: Pagination
}
