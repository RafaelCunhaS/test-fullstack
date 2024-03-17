import { HttpStatus } from '../utils/HttpStatus'
import HttpError from './HttpError'

export default class NotFound extends HttpError {
  constructor(message: string) {
    const statusCode = HttpStatus.NOT_FOUND
    super(statusCode, message)
  }
}
