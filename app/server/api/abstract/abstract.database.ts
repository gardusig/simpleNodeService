import { Logger } from '@nestjs/common'

export abstract class AbstractDatabase<DatabaseMethods> {
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
}
