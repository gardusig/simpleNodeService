import { GenericService } from './service'
import {
  Param,
  Body,
  Post,
  Get,
  Put,
  Delete,
  Logger,
  HttpException,
  HttpStatus,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'

const knownExceptions = new Set([
  NotFoundException, ConflictException,
])

export abstract class GenericController<T> {
  protected readonly logger = new Logger(GenericController.name)

  protected readonly service: GenericService<T>

  constructor(service: GenericService<T>) {
    this.service = service
  }

  @Post()
  async register(@Body() entity: T): Promise<T> {
    try {
      return await this.service.create(entity)
    } catch (error: any) {
      throw this.handleHttpException(error)
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<T> {
    try {
      return await this.service.findById(id)
    } catch (error: any) {
      throw this.handleHttpException(error)
    }
  }

  @Get()
  async findAll(): Promise<T[]> {
    try {
      return await this.service.findAll()
    } catch (error: any) {
      throw this.handleHttpException(error)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() entity: T): Promise<T> {
    try {
      return await this.service.update(id, entity)
    } catch (error: any) {
      throw this.handleHttpException(error)
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<T> {
    try {
      return await this.service.delete(id)
    } catch (error: any) {
      throw this.handleHttpException(error)
    }
  }

  private handleHttpException(error: any): Error {
    this.logger.error(`Error processing request: ${error.message}`)
    this.logger.verbose(error.stack)
    if (!knownExceptions.has(error.constructor)) {
      throw new HttpException(
        `Internal Server Error: ${error.constructor.name} - ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
    return error
  }
}
