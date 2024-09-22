import { Inject, Injectable } from '@nestjs/common'
import { RandomObject } from '@prisma/client'
import { AbstractWriteService } from '../abstract/write.service.abstract'
import { RandomObjectWriteDatabaseToken } from './write.database.random_object'
import { AbstractWriteDatabase } from '../abstract/write.database.abstract'

export const RandomObjectWriteServiceToken = 'RandomObjectWriteService'

@Injectable()
export class RandomObjectWriteService extends AbstractWriteService<RandomObject> {
  constructor(@Inject(RandomObjectWriteDatabaseToken) database: AbstractWriteDatabase<RandomObject>) {
    super(database)
  }

  create(entity: RandomObject): Promise<RandomObject> {
    return this.database.create(entity, entity.id)
  }

  update(id: string, entity: RandomObject): Promise<RandomObject> {
    return this.database.update(id, entity)
  }

  delete(id: string): Promise<RandomObject> {
    return this.database.delete(id)
  }
}
