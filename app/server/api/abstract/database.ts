import { Logger } from '@nestjs/common'
import { NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

interface DatabaseMethods {
  findUnique: (params: any) => Promise<any>;
  findMany: () => Promise<any[]>;
  create: (params: any) => Promise<any>;
  update: (params: any) => Promise<any>;
  delete: (params: any) => Promise<any>;
}

export abstract class GenericDatabase<T> {
  protected readonly logger = new Logger(GenericDatabase.name)

  protected readonly backofficeClient: DatabaseMethods
  protected readonly gamemanagerClient?: PrismaClient
  protected readonly idKey: string

  constructor(backofficeClient: DatabaseMethods, idKey: string, gamemanagerClient?: PrismaClient) {
    if (!backofficeClient) {
      this.logger.error('Prisma backoffice client is undefined in GenericDatabase constructor.')
    }
    if (!idKey) {
      this.logger.error('ID key is undefined in GenericDatabase constructor.')
    }
    this.backofficeClient = backofficeClient
    this.gamemanagerClient = gamemanagerClient
    this.idKey = idKey
  }

  async findById(id: string): Promise<T> {
    const existingRecord = await this.backofficeClient.findUnique({
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
    return await this.backofficeClient.findMany()
  }

  async create(data: T, id: string): Promise<T> {
    this.logger.debug(`Creating record with ID ${id}...`)
    const existingRecord = await this.backofficeClient.findUnique({
      where: {
        [this.idKey]: id,
      },
    })
    if (existingRecord) {
      this.logger.warn(`Record with ID ${id} already exists.`)
      throw new ConflictException(`Record with ID ${id} already exists.`)
    }
    return await this.backofficeClient.create({
      data,
    })
  }

  async update(id: string, data: T): Promise<T> {
    const existingRecord = await this.backofficeClient.findUnique({
      where: {
        [this.idKey]: id,
      },
    })
    if (!existingRecord) {
      this.logger.warn(`Record with ID ${id} not found. Update operation skipped.`)
      throw new NotFoundException(`Record with ID ${id} not found.`)
    }
    return await this.backofficeClient.update({
      where: {
        [this.idKey]: id,
      },
      data: data,
    })
  }

  async delete(id: string): Promise<T> {
    const existingRecord = await this.backofficeClient.findUnique({
      where: {
        [this.idKey]: id,
      },
    })
    if (!existingRecord) {
      this.logger.warn(`Record with ID ${id} not found. Delete operation skipped.`)
      throw new NotFoundException(`Record with ID ${id} not found.`)
    }
    return await this.backofficeClient.delete({
      where: {
        [this.idKey]: id,
      },
    })
  }
}
