import { makeHealthCheckRequest } from './util/health_check'
import { retry } from './util/retry'

const waitServer = async () => {
    await retry(makeHealthCheckRequest)
}

beforeAll(async () => {
    await waitServer()
}, 30 * 1000);
