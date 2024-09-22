import { Module } from '@nestjs/common'
import { AbstractModule } from '../abstract/abstract.module'
import { RandomObjectReadController } from './read.controller.random_object'
import { RandomObjectReadService, RandomObjectReadServiceToken } from './read.service.random_object'
import { RandomObjectReadDatabase, RandomObjectReadDatabaseToken } from './read.database.random_object'

@Module({
  imports: [
    AbstractModule.configure({
      controller: RandomObjectReadController,
      service: RandomObjectReadService,
      serviceToken: RandomObjectReadServiceToken,
      dbImplementation: RandomObjectReadDatabase,
      dbToken: RandomObjectReadDatabaseToken,
    }),
  ],
})
export class RandomObjectReadModule {}
