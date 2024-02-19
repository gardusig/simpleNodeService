import { Controller, Inject } from '@nestjs/common'
import { GenericController } from '../abstract/controller'
import { RandomObject } from '@prisma/client'
import { GenericService } from '../abstract/service'
import { RandomObjectServiceToken } from './service'

@Controller('random_object')
export class RandomObjectController extends GenericController<RandomObject> {
  constructor(@Inject(RandomObjectServiceToken) service: GenericService<RandomObject>) {
    super(service)
  }
}
