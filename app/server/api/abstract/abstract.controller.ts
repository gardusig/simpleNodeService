import {
  Logger,
  HttpException,
  HttpStatus,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'

const knownExceptions = new Set([NotFoundException, ConflictException])

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
