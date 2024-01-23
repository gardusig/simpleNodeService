import { RandomObjectBuilder } from '../model/builder/random_object_builder'
import { RandomObject } from '../model/random_object'

export const RandomObjectDatabaseToken = 'RandomObjectDatabaseInterface'

export interface RandomObjectDatabaseInterface {
  register(randomObjectBuilder: RandomObjectBuilder): Promise<RandomObject>
}
