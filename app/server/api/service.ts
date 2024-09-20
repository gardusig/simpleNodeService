import { Logger } from '@nestjs/common'
import { GenericDatabase } from './abstract/read.database'

export abstract class GenericService<T> {
  protected readonly logger = new Logger(GenericService.name)

  protected readonly database: GenericDatabase<T>

  constructor(database: GenericDatabase<T>) {
    this.database = database
  }

  abstract create(entity: T): Promise<T>

  async findById(id: string): Promise<T> {
    return await this.database.findById(id)
  }

  async findAll(): Promise<T[]> {
    return await this.database.findAll()
  }

  async update(id: string, entity: T): Promise<T> {
    return await this.database.update(id, entity)
  }

  async delete(id: string): Promise<T> {
    return await this.database.delete(id)
  }
}
