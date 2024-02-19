import { Injectable } from '@nestjs/common'
import { GenericDatabase } from '../abstract/database'
import { PrismaClientService } from '../../prisma_client/service'
import { RandomObject } from '@prisma/client'

export const RandomObjectDatabaseToken = 'RandomObjectDatabasePostgres'

@Injectable()
export class RandomObjectDatabasePostgresImplementation extends GenericDatabase<RandomObject> {
  constructor(prismaClient: PrismaClientService) {
    super(prismaClient.randomObject, 'id')
  }
}
