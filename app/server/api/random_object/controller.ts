import { Controller, Inject } from '@nestjs/common'
import { RandomObjectServiceToken, RandomObjectService } from './service'
import { GenericController } from '../abstract/controller'
import { RandomObject } from '@prisma/client'

@Controller('random_object')
export class RandomObjectController extends GenericController<RandomObject> {
  constructor(@Inject(RandomObjectServiceToken) service: RandomObjectService) {
    super(service)
  }
}
