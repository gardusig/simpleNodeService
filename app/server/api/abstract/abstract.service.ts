import { Logger } from "@nestjs/common";

import { AbstractDatabase } from "./abstract.database";

export abstract class AbstractService<T> {
  protected readonly logger = new Logger(AbstractService.name);
  protected readonly database: AbstractDatabase<T>;

  constructor(database: AbstractDatabase<T>) {
    this.database = database;
  }

  abstract findById(id: string): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract create(entity: T): Promise<T>;
  abstract update(id: string, entity: T): Promise<T>;
  abstract delete(id: string): Promise<T>;
}
