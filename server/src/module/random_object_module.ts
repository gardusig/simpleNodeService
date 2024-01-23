import { Module } from '@nestjs/common'

import { RandomObjectController } from '../random_object/controller/random_object_controller'
import { RandomObjectDatabaseToken } from '../random_object/database/random_object_database_interface'
import { RandomObjectDatabasePostgresImplementation } from '../random_object/database/random_object_database_postgres_implementation'
import { RandomObjectServiceImplementation } from '../random_object/service/random_object_service_implementation'
import { RandomObjectServiceToken } from '../random_object/service/random_object_service_interface'

@Module({
  controllers: [RandomObjectController],
  providers: [
    RandomObjectServiceImplementation,
    {
      provide: RandomObjectServiceToken,
      useClass: RandomObjectServiceImplementation,
    },
    RandomObjectDatabasePostgresImplementation,
    {
      provide: RandomObjectDatabaseToken,
      useClass: RandomObjectDatabasePostgresImplementation,
    },
  ],
  exports: [RandomObjectServiceToken, RandomObjectDatabaseToken],
})
export class RandomObjectModule {}
