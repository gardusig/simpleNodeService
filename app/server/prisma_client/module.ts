import { Module } from '@nestjs/common'
import { RandomObjectPrismaClient } from './client'

@Module({
  providers: [RandomObjectPrismaClient],
  exports: [RandomObjectPrismaClient],
})
export class PrismaClientModule { }
