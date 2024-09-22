import { AbstractController } from './abstract.controller'
import { AbstractWriteService } from './write.service.abstract'

export abstract class AbstractWriteController<T> extends AbstractController {
  protected readonly service: AbstractWriteService<T>

  constructor(service: AbstractWriteService<T>) {
    super()
    this.service = service
  }

  abstract create(entity: T): Promise<T>;
  abstract update(id: string, entity: T): Promise<T>;
  abstract delete(id: string): Promise<T>;
}
