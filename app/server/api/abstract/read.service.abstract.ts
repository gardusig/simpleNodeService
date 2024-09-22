// import { Logger } from '@nestjs/common'
// import { AbstractReadDatabase } from './read.database.abstract'

// export abstract class AbstractReadService<T> {
//   protected readonly logger = new Logger(AbstractReadService.name)

//   protected readonly database: AbstractReadDatabase<T>

//   constructor(database: AbstractReadDatabase<T>) {
//     this.database = database
//   }

//   async findById(id: string): Promise<T> {
//     return await this.database.findById(id)
//   }

//   async findAll(): Promise<T[]> {
//     return await this.database.findAll()
//   }
// }
