import { data, updatedData } from './mock_data'
import { AbstractTestSuite } from '../abstract/test_suite'
import { CasinoGameClient } from './client'

export class CasinoGameTestSuite extends AbstractTestSuite {
  constructor() {
    super(new CasinoGameClient(), {
      idKey: 'gameId',
      data: data,
      updatedData: updatedData,
    })
  }
}
