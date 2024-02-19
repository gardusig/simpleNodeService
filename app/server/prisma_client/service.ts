import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaClientService.name)

  constructor() {
    super()
  }

  async onModuleInit() {
    try {
      this.logger.debug('Connecting to the db...')
      await this.$connect()
      this.logger.debug('Connected to the db')
    } catch (error) {
      this.logger.error('Failed to connect to db, reason: ', error)
    }
  }

  async onModuleDestroy() {
    this.logger.debug('Disconnecting from the db...')
    await this.$disconnect()
    this.logger.debug('Disconnected from the db')
  }
}
