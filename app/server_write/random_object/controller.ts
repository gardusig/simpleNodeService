import { Controller, Inject } from '@nestjs/common'
import { RandomObjectServiceToken, RandomObjectService } from './service'
import { RandomObject } from '@prisma/client'
import { Param, Body, Post, Put, Delete } from '@nestjs/common'
import { GenericController } from '../../server/api/abstract/read.controller'

@Controller('random_object')
export class RandomObjectController extends GenericController<RandomObject> {
  constructor(@Inject(RandomObjectServiceToken) service: RandomObjectService) {
    super(service)
  }

  @Post()
  async register(@Body() entity: RandomObject): Promise<RandomObject> {
    try {
      return await this.service.create(entity)
    } catch (error: any) {
      throw this.handleHttpException(error)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() entity: RandomObject): Promise<RandomObject> {
    try {
      return await this.service.update(id, entity)
    } catch (error: any) {
      throw this.handleHttpException(error)
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<RandomObject> {
    try {
      return await this.service.delete(id)
    } catch (error: any) {
      throw this.handleHttpException(error)
    }
  }
}
