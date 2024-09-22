import { Logger } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common'

interface ReadDatabaseMethods {
  findUnique: (params: any) => Promise<any>;
  findMany: () => Promise<any[]>;
}

export abstract class AbstractReadDatabase<T> {
  protected readonly logger = new Logger(AbstractReadDatabase.name)

  protected readonly dbClient: ReadDatabaseMethods
  protected readonly idKey: string

  constructor(dbClient: ReadDatabaseMethods, idKey: string) {
    if (!dbClient) {
      this.logger.error('Prisma database client is undefined in GenericDatabase constructor.')
    }
    if (!idKey) {
      this.logger.error('ID key is undefined in GenericDatabase constructor.')
    }
    this.dbClient = dbClient
    this.idKey = idKey
  }

  async findById(id: string): Promise<T> {
    const existingRecord = await this.dbClient.findUnique({
      where: {
        [this.idKey]: id,
      },
    })
    if (!existingRecord) {
      this.logger.warn(`Record with ID ${id} not found. Update operation skipped.`)
      throw new NotFoundException(`Record with ID ${id} not found.`)
    }
    return existingRecord
  }

  async findAll(): Promise<T[]> {
    return await this.dbClient.findMany()
  }
}
