// import { Controller, Inject } from '@nestjs/common'
// import { RandomObjectReadService, RandomObjectReadServiceToken } from './read.service.random_object'
// import { RandomObject } from '@prisma/client'
// import { Param, Get } from '@nestjs/common'
// import { AbstractReadController } from '../abstract/read.controller.abstract'

// @Controller('random_object')
// export class RandomObjectReadController extends AbstractReadController<RandomObject> {
//   constructor(@Inject(RandomObjectReadServiceToken) service: RandomObjectReadService) {
//     super(service)
//   }

//   @Get(':id')
//   async findById(@Param('id') id: string): Promise<RandomObject> {
//     try {
//       return await this.service.findById(id)
//     } catch (error: any) {
//       throw this.handleHttpException(error)
//     }
//   }

//   @Get()
//   async findAll(): Promise<RandomObject[]> {
//     try {
//       return await this.service.findAll()
//     } catch (error: any) {
//       throw this.handleHttpException(error)
//     }
//   }
// }
