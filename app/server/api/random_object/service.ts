import { Inject, Injectable } from '@nestjs/common'
import { GenericService } from '../abstract/service'
import { GenericDatabase } from '../abstract/database'
import { RandomObjectDatabaseToken } from './database'
import { RandomObject } from '@prisma/client'

export const RandomObjectServiceToken = 'RandomObjectService'

@Injectable()
export class RandomObjectService extends GenericService<RandomObject> {
  constructor(@Inject(RandomObjectDatabaseToken) database: GenericDatabase<RandomObject>) {
    super(database)
  }

  async create(entity: RandomObject): Promise<RandomObject> {
    return this.database.create(entity, entity.id.toString())
  }
}
