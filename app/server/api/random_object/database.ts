import { Injectable } from '@nestjs/common'
import { RandomObjectPrismaClient } from '../../server/prisma_client/client'
import { RandomObject } from '@prisma/client'
import { GenericDatabase } from '../../server/api/abstract/write.database'

export const RandomObjectReadDatabaseToken = 'RandomObjectReadDatabase'

@Injectable()
export class RandomObjectReadDatabase extends GenericDatabase<RandomObject> {
  constructor(prismaClient: RandomObjectPrismaClient) {
    super(prismaClient.randomObject, 'id')
  }
}
