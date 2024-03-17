import { type NextFunction, type Request, type Response } from 'express'
import { ZodError } from 'zod'
import HttpError from '../errors/HttpError'
import { HttpStatus } from '../utils/HttpStatus'

export default (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
  if (err instanceof ZodError) {
    return res.status(HttpStatus.BAD_REQUEST).json({ path: err.errors[0].path[0], message: err.errors[0].message })
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  console.error(err)
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
}
