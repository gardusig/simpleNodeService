import { Injectable } from '@nestjs/common'
import { PrismaClient, RandomObject } from '@prisma/client'
import { AbstractWriteDatabase } from '../abstract/write.database.abstract'

export const RandomObjectWriteDatabaseToken = 'RandomObjectWriteDatabase'

@Injectable()
export class RandomObjectWriteDatabase extends AbstractWriteDatabase<RandomObject> {
  constructor() {
    super(new PrismaClient().randomObject, 'id')
  }
}
