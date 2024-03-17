import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { HttpStatus } from '../../src/utils/HttpStatus'
import errorMiddleware from '../../src/middlewares/error'
import NotFound from '../../src/errors/NotFound'

describe.only('Error Middleware', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response
    next = jest.fn() as NextFunction
  })

  it('should handle ZodError and return 400 status code with error message', () => {
    const err = new ZodError([{ code: 'custom', path: ['name'], message: 'Name is required' }])

    errorMiddleware(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ path: 'name', message: 'Name is required' })
  })

  it('should handle HttpError and return corresponding status code with error message', () => {
    const err = new NotFound('Resource not found')

    errorMiddleware(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({ message: 'Resource not found' })
  })

  it('should handle other errors and return 500 status code with error message', () => {
    const err = new Error('Internal server error')

    errorMiddleware(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' })
  })
})
