import { Module } from '@nestjs/common'
import { AbstractModule } from '../abstract/abstract.module'
import { RandomObjectController } from './random_object.controller'
import { RandomObjectService, RandomObjectServiceToken } from './random_object.service'
import { RandomObjectDatabase, RandomObjectDatabaseToken } from './random_object.database'

@Module({
  imports: [
    AbstractModule.configure({
      controller: RandomObjectController,
      service: RandomObjectService,
      serviceToken: RandomObjectServiceToken,
      dbImplementation: RandomObjectDatabase,
      dbToken: RandomObjectDatabaseToken,
    }),
  ],
})
export class RandomObjectModule {}
