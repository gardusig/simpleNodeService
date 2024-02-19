import { Module } from '@nestjs/common'
import { RandomObjectService, RandomObjectServiceToken } from './service'
import { GenericModule } from '../abstract/module'
import {
  RandomObjectDatabasePostgresImplementation,
  RandomObjectDatabaseToken,
} from './database'
import { RandomObject } from '@prisma/client'
import { RandomObjectController } from './controller'

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
export class RandomObjectModule { }
