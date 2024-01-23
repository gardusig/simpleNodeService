import { Inject, Injectable } from '@nestjs/common'
import {
  RandomObjectDatabaseInterface,
  RandomObjectDatabaseToken,
} from '../database/random_object_database_interface'
import { RandomObjectBuilder } from '../model/builder/random_object_builder'
import { RandomObject } from '../model/random_object'
import { RandomObjectServiceInterface } from './random_object_service_interface'

@Injectable()
export class RandomObjectServiceImplementation
  implements RandomObjectServiceInterface
{
  constructor(
    @Inject(RandomObjectDatabaseToken)
    private readonly randomObjectDatabase: RandomObjectDatabaseInterface,
  ) {}

  async register(
    charField: string,
    booleanField: boolean,
    intField?: number,
  ): Promise<RandomObject> {
    const randomObjectBuilder = new RandomObjectBuilder()
      .withCharField(charField)
      .withBooleanField(booleanField)
    if (intField !== undefined) {
      randomObjectBuilder.withIntField(intField)
    }
    const randomObject =
      await this.randomObjectDatabase.register(randomObjectBuilder)
    return randomObject
  }
}
