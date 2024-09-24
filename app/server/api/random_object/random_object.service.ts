import { Inject, Injectable } from '@nestjs/common'
import { RandomObject } from '@prisma/client'
import { AbstractService } from '../abstract/abstract.service'
import { AbstractDatabase } from '../abstract/abstract.database'
import { RandomObjectDatabaseToken } from './random_object.database'

export const RandomObjectServiceToken = 'RandomObjectService'

@Injectable()
export class RandomObjectService extends AbstractService<RandomObject> {
  constructor(@Inject(RandomObjectDatabaseToken) database: AbstractDatabase<RandomObject>) {
    super(database)
  }

  findById(id: string): Promise<RandomObject> {
    return this.database.findById(id)
  }

  findAll(): Promise<RandomObject[]> {
    return this.database.findAll()
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
