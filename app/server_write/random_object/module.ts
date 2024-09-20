import { Module } from '@nestjs/common'
import { RandomObjectController } from './controller'
import { RandomObjectService, RandomObjectServiceToken } from './service'
import { GenericModule } from '../../server/api/module'
import {
  RandomObjectDatabasePostgresImplementation,
  RandomObjectDatabaseToken,
} from './database'
import { RandomObject } from '@prisma/client'

@Module({
  imports: [
    GenericModule.configure<RandomObject>({
      controller: RandomObjectController,
      service: RandomObjectService,
      serviceToken: RandomObjectServiceToken,
      dbImplementation: RandomObjectDatabasePostgresImplementation,
      dbToken: RandomObjectDatabaseToken,
    }),
  ],
})
export class RandomObjectWriteModule { }
