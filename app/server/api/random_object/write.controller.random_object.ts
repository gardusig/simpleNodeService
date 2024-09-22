import {
  Param,
  Controller,
  Delete,
  Inject,
  Post,
  Put,
  Body,
} from '@nestjs/common'
import { RandomObject } from '@prisma/client'
import {
  RandomObjectWriteService,
  RandomObjectWriteServiceToken,
} from './write.service.random_object'
import { AbstractWriteController } from '../abstract/write.controller.abstract'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger'
import { RandomObjectDto } from './dto.random_object'

@ApiTags('RandomObject')
@Controller('random_object')
export class RandomObjectWriteController extends AbstractWriteController<RandomObject> {
  constructor(
    @Inject(RandomObjectWriteServiceToken) service: RandomObjectWriteService
  ) {
    super(service)
  }

  @ApiOperation({ summary: 'Create a new RandomObject' })
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
