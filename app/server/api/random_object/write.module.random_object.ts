import { Module } from '@nestjs/common'
import { RandomObjectWriteController } from './write.controller.random_object'
import { AbstractModule } from '../abstract/abstract.module'
import { RandomObjectWriteService, RandomObjectWriteServiceToken } from './write.service.random_object'
import { RandomObjectWriteDatabase, RandomObjectWriteDatabaseToken } from './write.database.random_object'

@Module({
  imports: [
    AbstractModule.configure({
      controller: RandomObjectWriteController,
      service: RandomObjectWriteService,
      serviceToken: RandomObjectWriteServiceToken,
      dbImplementation: RandomObjectWriteDatabase,
      dbToken: RandomObjectWriteDatabaseToken,
    }),
  ],
})
export class RandomObjectWriteModule {}
