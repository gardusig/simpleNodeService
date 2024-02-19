import { Module } from '@nestjs/common'
import { PrismaClientService } from './service'

@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})
export class PrismaClientModule {}
