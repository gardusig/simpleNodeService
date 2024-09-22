import { Injectable } from '@nestjs/common'
import { PrismaClient, RandomObject } from '@prisma/client'
import { AbstractReadDatabase } from '../abstract/read.database.abstract'

export const RandomObjectReadDatabaseToken = 'RandomObjectReadDatabase'

@Injectable()
export class RandomObjectReadDatabase extends AbstractReadDatabase<RandomObject> {
  constructor() {
    super(new PrismaClient().randomObject, 'id')
  }
}
