import { data, updatedData } from './mock_data'
import { AbstractTestSuite } from '../abstract/test_suite'
import { RandomObjectClient } from './client'

export class RandomObjectTestSuite extends AbstractTestSuite {
  constructor() {
    super(new RandomObjectClient(), {
      idKey: 'id',
      data: data,
      updatedData: updatedData,
    })
  }
}
