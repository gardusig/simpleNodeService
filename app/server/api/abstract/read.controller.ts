import { GenericService } from '../service'
import { AbstractController } from './controller'

export abstract class AbstractReadController<T> extends AbstractController {
  protected readonly service: GenericService<T>

  constructor(service: GenericService<T>) {
    super()
    this.service = service
  }

  abstract findById(id: string): Promise<T>;
  abstract findAll(): Promise<T[]> ;
}
