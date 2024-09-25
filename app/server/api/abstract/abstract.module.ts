import { DynamicModule, InjectionToken, Type } from "@nestjs/common";

interface GenericModuleOptions {
  controller: Type<any>;
  service: Type<any>;
  serviceToken: InjectionToken;
  dbImplementation: Type<any>;
  dbToken: InjectionToken;
}

export class AbstractModule {
  static configure(options: GenericModuleOptions): DynamicModule {
    return {
      module: AbstractModule,
      controllers: [options.controller],
      providers: [
        {
          provide: options.serviceToken,
          useClass: options.service,
        },
        {
          provide: options.dbToken,
          useClass: options.dbImplementation,
        },
      ],
      exports: [options.serviceToken, options.dbToken],
    };
  }
}
