import { Inject, Injectable } from '@nestjs/common'
import { RandomObjectDatabaseToken } from './database'
import { RandomObject } from '@prisma/client'
import { GenericService } from '../../server/api/service'
import { GenericDatabase } from '../../server/api/abstract/write.database'

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
