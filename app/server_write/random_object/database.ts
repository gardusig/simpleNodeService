import { Injectable } from '@nestjs/common'
import { GenericDatabase } from '../../server/api/abstract/write.database'
import { RandomObjectPrismaClient } from '../../server/prisma_client/client'
import { RandomObject } from '@prisma/client'

export const RandomObjectDatabaseToken = 'RandomObjectDatabase'

@Injectable()
export class RandomObjectDatabasePostgresImplementation extends GenericDatabase<RandomObject> {
  constructor(prismaClient: RandomObjectPrismaClient) {
    super(prismaClient.randomObject, 'id')
  }
}
