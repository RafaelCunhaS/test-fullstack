import { type NextFunction, type Response } from 'express'
import { type RequestPagination } from '../interfaces/IPagination'

export default (req: RequestPagination, _res: Response, next: NextFunction): void => {
  const pageAsNumber = Number.parseInt(req.query.page as string, 10)
  const sizeAsNumber = Number.parseInt(req.query.size as string, 10)

  let page = 0
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber
  }

  let size = 5
  if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)) {
    size = sizeAsNumber
  }

  req.pagination = {
    page,
    size
  }

  next()
}
