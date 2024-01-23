import { Injectable } from '@nestjs/common'

import { RandomObjectDatabaseInterface } from './random_object_database_interface'
import { RandomObjectBuilder } from '../model/builder/random_object_builder'
import { RandomObject } from '../model/random_object'

@Injectable()
export class RandomObjectDatabasePostgresImplementation
  implements RandomObjectDatabaseInterface
{
  async register(
    randomObjectBuilder: RandomObjectBuilder,
  ): Promise<RandomObject> {
    return new Promise<RandomObject>((resolve, reject) => {
      try {
        const randomObject = randomObjectBuilder.build()
        resolve(randomObject)
      } catch (error) {
        reject(error)
      }
    })
  }
}
