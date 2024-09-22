import { NotFoundException } from '@nestjs/common'
import { AbstractDatabase } from './abstract.database'

interface ReadDatabaseMethods {
  findUnique: (params: any) => Promise<any>;
  findMany: () => Promise<any[]>;
}

export abstract class AbstractReadDatabase<T> extends AbstractDatabase<ReadDatabaseMethods> {
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
}
