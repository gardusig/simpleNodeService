import { Injectable } from '@nestjs/common'
import { GenericDatabase } from '../abstract/database'
import { RandomObjectPrismaClient } from '../../prisma_client/client'
import { RandomObject } from '@prisma/client'

export const RandomObjectDatabaseToken = 'RandomObjectDatabase'

@Injectable()
export class RandomObjectDatabasePostgresImplementation extends GenericDatabase<RandomObject> {
  constructor(prismaClient: RandomObjectPrismaClient) {
    super(prismaClient.randomObject, 'id')
  }
}
