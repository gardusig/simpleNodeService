import axios from 'axios'
import { getServerUrl } from '../util/setup'

const serverUrl = getServerUrl()
const randomObjectUrl = `${serverUrl}/random_object`

describe('[e2e] RandomObjectController', () => {
  describe('/random_object/register (POST)', () => {
    it('should register a random object', async () => {
      const requestBody = {
        charField: 'testChar',
        booleanField: true,
        intField: 420,
      }
      const response = await registerRandomObject(requestBody)
      expect(response).toEqual(requestBody)
    })
  })
})

const registerRandomObject = async (data: any) => {
  const registerRandomObjectUrl = `${randomObjectUrl}/register`
  const response = await axios.post(
    registerRandomObjectUrl, data
  )
  return response.data
}
