import { Logger } from '@nestjs/common'
import { AbstractWriteDatabase } from './write.database.abstract'

export abstract class AbstractWriteService<T> {
  protected readonly logger = new Logger(AbstractWriteService.name)

  protected readonly database: AbstractWriteDatabase<T>

  constructor(database: AbstractWriteDatabase<T>) {
    this.database = database
  }

  abstract create(entity: T): Promise<T>;
  abstract update(id: string, entity: T): Promise<T>;
  abstract delete(id: string): Promise<T>;
}
