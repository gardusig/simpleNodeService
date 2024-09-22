import { Logger } from '@nestjs/common'
import { NotFoundException, ConflictException } from '@nestjs/common'

interface WriteDatabaseMethods {
  findUnique: (params: any) => Promise<any>;
  create: (params: any) => Promise<any>;
  update: (params: any) => Promise<any>;
  delete: (params: any) => Promise<any>;
}

export abstract class AbstractWriteDatabase<T> {
  protected readonly logger = new Logger(AbstractWriteDatabase.name)

  protected readonly dbClient: WriteDatabaseMethods
  protected readonly idKey: string

  constructor(dbClient: WriteDatabaseMethods, idKey: string) {
    if (!dbClient) {
      this.logger.error('Prisma database client is undefined in GenericDatabase constructor.')
    }
    if (!idKey) {
      this.logger.error('ID key is undefined in GenericDatabase constructor.')
    }
    this.dbClient = dbClient
    this.idKey = idKey
  }

  async create(data: T, id: string): Promise<T> {
    this.logger.debug(`Creating record with ID ${id}...`)
    const existingRecord = await this.dbClient.findUnique({
      where: {
        [this.idKey]: id,
      },
    })
    if (existingRecord) {
      this.logger.warn(`Record with ID ${id} already exists.`)
      throw new ConflictException(`Record with ID ${id} already exists.`)
    }
    return await this.dbClient.create({
      data,
    })
  }

  async update(id: string, data: T): Promise<T> {
    const existingRecord = await this.dbClient.findUnique({
      where: {
        [this.idKey]: id,
      },
    })
    if (!existingRecord) {
      this.logger.warn(`Record with ID ${id} not found. Update operation skipped.`)
      throw new NotFoundException(`Record with ID ${id} not found.`)
    }
    return await this.dbClient.update({
      where: {
        [this.idKey]: id,
      },
      data: data,
    })
  }

  async delete(id: string): Promise<T> {
    const existingRecord = await this.dbClient.findUnique({
      where: {
        [this.idKey]: id,
      },
    })
    if (!existingRecord) {
      this.logger.warn(`Record with ID ${id} not found. Delete operation skipped.`)
      throw new NotFoundException(`Record with ID ${id} not found.`)
    }
    return await this.dbClient.delete({
      where: {
        [this.idKey]: id,
      },
    })
  }
}
