import { Controller, Post, Body, Inject } from '@nestjs/common'

import {
  RandomObjectServiceInterface,
  RandomObjectServiceToken,
} from '../service/random_object_service_interface'
import { RandomObject } from '../model/random_object'
import { ApiTags } from '@nestjs/swagger'
@ApiTags('Random Object')
@Controller('random_object')
export class RandomObjectController {
  constructor(
    @Inject(RandomObjectServiceToken)
    private readonly randomObjectService: RandomObjectServiceInterface,
  ) {}

  @Post('register')
  async register(@Body() randomObject: RandomObject) {
    return this.randomObjectService.register(
      randomObject.charField,
      randomObject.booleanField,
      randomObject.intField,
    )
  }
}
