import { RandomObject } from '../model/random_object'

export const RandomObjectServiceToken = 'RandomObjectServiceToken'

export interface RandomObjectServiceInterface {
  register(
    charField: string,
    booleanField: boolean,
    intField?: number,
  ): Promise<RandomObject>
}
