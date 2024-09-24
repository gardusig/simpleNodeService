import { Body, Controller, Delete, Inject, Post, Put } from '@nestjs/common'
import { Param, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { AbstractController, ApiAuthHeaders } from '../abstract/abstract.controller'
import { RandomObjectDto } from './random_object.dto'
import { RandomObjectServiceToken } from './random_object.service'
import { RandomObject } from '@prisma/client'
import { AbstractService } from '../abstract/abstract.service'

@ApiTags('random_object')
@Controller('random_object')
export class RandomObjectController extends AbstractController<RandomObject> {
  constructor(
    @Inject(RandomObjectServiceToken) service: AbstractService<RandomObject>
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

  @ApiOperation({ summary: 'Create a new RandomObject' })
  @ApiAuthHeaders()
  @ApiResponse({
    status: 201,
    description: 'RandomObject created successfully',
    type: RandomObjectDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiBody({
    type: RandomObjectDto,
    description: 'The RandomObject entity to create',
  })
  @Post()
  create(@Body() entity: RandomObject): Promise<RandomObject> {
    return this.service.create(entity)
  }

  @ApiOperation({ summary: 'Update an existing RandomObject by ID' })
  @ApiAuthHeaders()
  @ApiResponse({
    status: 200,
    description: 'RandomObject updated successfully',
    type: RandomObjectDto,
  })
  @ApiResponse({ status: 404, description: 'RandomObject not found' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the RandomObject to update',
  })
  @ApiBody({
    type: RandomObjectDto,
    description: 'The updated RandomObject entity',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() entity: RandomObject
  ): Promise<RandomObject> {
    return this.service.update(id, entity)
  }

  @ApiOperation({ summary: 'Delete a RandomObject by ID' })
  @ApiAuthHeaders()
  @ApiResponse({
    status: 200,
    description: 'RandomObject deleted successfully',
    type: RandomObjectDto,
  })
  @ApiResponse({ status: 404, description: 'RandomObject not found' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the RandomObject to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<RandomObject> {
    return this.service.delete(id)
  }
}
