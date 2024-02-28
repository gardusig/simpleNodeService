import { GenericController } from './controller'
import { GenericDatabase } from './database'
import { DynamicModule, InjectionToken, Provider, Type } from '@nestjs/common'
import { GenericService } from './service'
import { RandomObjectPrismaClient } from '../../prisma_client/client'

interface GenericModuleOptions<T> {
  controller: Type<GenericController<T>>
  service: Type<GenericService<T>>
  serviceToken: InjectionToken<GenericService<T>>
  dbImplementation: Type<GenericDatabase<T>>
  dbToken: InjectionToken<GenericDatabase<T>>
}

export class GenericModule {
  static configure<T>(options: GenericModuleOptions<T>): DynamicModule {
    const { controller, service, serviceToken, dbImplementation, dbToken } =
      options
    const providers: Provider[] = [
      {
        provide: service,
        useClass: service,
      },
      {
        provide: serviceToken,
        useExisting: service,
      },
      {
        provide: dbImplementation,
        useClass: dbImplementation,
      },
      {
        provide: dbToken,
        useExisting: dbImplementation,
      },
      RandomObjectPrismaClient,
    ]
    const moduleMetadata: DynamicModule = {
      module: GenericModule,
      controllers: [controller],
      providers,
      exports: [serviceToken, dbToken],
    }
    return moduleMetadata
  }
}
