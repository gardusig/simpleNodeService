import { Inject, Injectable } from '@nestjs/common'
import { RandomObjectReadDatabaseToken } from './database'
import { RandomObject } from '@prisma/client'
import { GenericService } from '../../server/api/service'
import { GenericDatabase } from '../../server/api/abstract/write.database'

export const RandomObjectReadServiceToken = 'RandomObjectReadService'

@Injectable()
export class RandomObjectReadService extends GenericService<RandomObject> {
  constructor(@Inject(RandomObjectReadDatabaseToken) database: GenericDatabase<RandomObject>) {
    super(database)
  }

  async create(entity: RandomObject): Promise<RandomObject> {
    return this.database.create(entity, entity.id.toString())
  }
}
