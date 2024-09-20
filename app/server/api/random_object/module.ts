import { Module } from '@nestjs/common'
import { RandomObjectController } from './controller'
import { RandomObjectReadService, RandomObjectReadServiceToken } from './service'
import {
  RandomObjectReadDatabaseToken,
  RandomObjectReadDatabase,
} from './database'
import { RandomObject } from '@prisma/client'
import { GenericModule } from '../../server/api/module'

@Module({
  imports: [
    GenericModule.configure<RandomObject>({
      controller: RandomObjectController,
      service: RandomObjectReadService,
      serviceToken: RandomObjectReadServiceToken,
      dbImplementation: RandomObjectReadDatabase,
      dbToken: RandomObjectReadDatabaseToken,
    }),
  ],
})
export class RandomObjectReadModule { }
