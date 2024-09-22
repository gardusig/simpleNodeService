import { Controller, Inject } from '@nestjs/common'
import {
  RandomObjectReadService,
  RandomObjectReadServiceToken,
} from './read.service.random_object'
import { RandomObject } from '@prisma/client'
import { Param, Get } from '@nestjs/common'
import { AbstractReadController } from '../abstract/read.controller.abstract'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { RandomObjectDto } from './dto.random_object'
import { ApiAuthHeaders } from '../abstract/abstract.controller'

@ApiTags('random_object')
@Controller('random_object')
export class RandomObjectReadController extends AbstractReadController<RandomObject> {
  constructor(
    @Inject(RandomObjectReadServiceToken) service: RandomObjectReadService
  ) {
    super(service)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a RandomObject by ID' })
  @ApiAuthHeaders()
  @ApiResponse({
    status: 200,
    description: 'The found RandomObject',
    type: RandomObjectDto,
  })
  @ApiResponse({ status: 404, description: 'RandomObject not found' })
  async findById(@Param('id') id: string): Promise<RandomObject> {
    try {
      return await this.service.findById(id)
    } catch (error: any) {
      throw this.handleHttpException(error)
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all RandomObjects' })
  @ApiAuthHeaders()
  @ApiResponse({
    status: 200,
    description: 'List of RandomObjects',
    type: [RandomObjectDto],
  })
  async findAll(): Promise<RandomObject[]> {
    try {
      return await this.service.findAll()
    } catch (error: any) {
      throw this.handleHttpException(error)
    }
  }
}
