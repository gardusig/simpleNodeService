import { NotFoundException, ConflictException } from '@nestjs/common'
import { Logger } from '@nestjs/common'

interface DatabaseMethods {
  findUnique: (params: any) => Promise<any>;
  findMany: () => Promise<any[]>;
  create: (params: any) => Promise<any>;
  update: (params: any) => Promise<any>;
  delete: (params: any) => Promise<any>;
}

export abstract class AbstractDatabase<T> {
  protected readonly logger = new Logger(AbstractDatabase.name)

  protected readonly dbClient: DatabaseMethods
  protected readonly idKey: string

  constructor(dbClient: DatabaseMethods, idKey: string) {
    if (!dbClient) {
      throw new Error(
        'Prisma database client is undefined in AbstractReadDatabase constructor.'
      )
    }
    if (!idKey) {
      throw new Error(
        'ID key is undefined in AbstractReadDatabase constructor.'
      )
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
      throw new NotFoundException(`Record with ID ${id} not found.`)
    }
    return existingRecord
  }

  async findAll(): Promise<T[]> {
    return await this.dbClient.findMany()
  }

  async create(data: T, id: string): Promise<T> {
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
