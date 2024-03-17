import { HttpStatus } from '../utils/HttpStatus'
import HttpError from './HttpError'

export default class BadRequest extends HttpError {
  constructor(message: string) {
    const statusCode = HttpStatus.BAD_REQUEST
    super(statusCode, message)
  }
}
