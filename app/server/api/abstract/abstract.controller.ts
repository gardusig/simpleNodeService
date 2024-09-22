import {
  Logger,
  HttpException,
  HttpStatus,
  NotFoundException,
  ConflictException,
  applyDecorators,
} from '@nestjs/common'
import { ApiHeader } from '@nestjs/swagger'

const knownExceptions = new Set([NotFoundException, ConflictException])

export function ApiAuthHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'username',
      description: 'Username for authentication',
      required: true,
    }),
    ApiHeader({
      name: 'password',
      description: 'Password for authentication',
      required: true,
    })
  )
}

export abstract class AbstractController {
  protected readonly logger = new Logger(AbstractController.name)

  protected handleHttpException(error: any): Error {
    this.logger.error(`Error processing request: ${error.message}`)
    this.logger.verbose(error.stack)
    if (!knownExceptions.has(error.constructor)) {
      throw new HttpException(
        `Internal Server Error: ${error.constructor.name} - ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    return error
  }
}
