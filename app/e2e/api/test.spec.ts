import { AbstractTestSuite } from './abstract/test_suite'
import { CasinoGameTestSuite } from './game/test_suite'
import { CasinoGameCallTestSuite } from './gamecall/test_suite'
import { CasinoPlayerTestSuite } from './player/test_suite'
import { CasinoProviderTestSuite } from './provider/test_suite'
import { CasinoTournamentTestSuite } from './tournament/test_suite'
import { CasinoTransactionTestSuite } from './transaction/test_suite'

const testSuites: AbstractTestSuite[] = [
    new CasinoGameTestSuite(),
    new CasinoGameCallTestSuite(),
    new CasinoPlayerTestSuite(),
    new CasinoProviderTestSuite(),
    new CasinoTournamentTestSuite(),
    new CasinoTransactionTestSuite(),
]

async function runTests() {
    await Promise.all(testSuites.map(testSuite => {
        return new Promise(() => {
            describe(testSuite.constructor.name, () => {
                testSuite.runTests()
            })
        })
    }))
}

runTests()
