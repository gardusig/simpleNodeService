import axios from 'axios'
import { getServerUrl } from './setup'

const serverUrl = getServerUrl()
const healthUrl = `${serverUrl}/health`

export const makeHealthCheckRequest = async () => {
    console.log('Attempting health check...')
    const response = await axios.get(healthUrl)
    if (response.status !== 200) {
        throw new Error(`Health check failed with status code: ${response.status}`)
    }
}