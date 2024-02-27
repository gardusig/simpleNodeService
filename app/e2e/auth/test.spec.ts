import { HttpStatus } from '@nestjs/common'
import { RandomObjectClient } from 'e2e/api/random_object/client'

const headerEmpty = {}
const headerWithoutPassword = {
  username: 'random_username',
}
const headerWithoutUser = {
  password: 'random_password',
}
const headerForbidden = {
  username: 'random_username',
  password: 'random_password',
}

describe('[e2e] Authentication Middleware', () => {
  const client = new RandomObjectClient()
  describe('[header] Empty Header', () => {
    it('should return HTTP 401 - UNAUTHORIZED', async () => {
      await expect(
        client.getAll!(headerEmpty)
      ).rejects.toHaveProperty('response.status', HttpStatus.UNAUTHORIZED)
    })
  })

  describe('[header] Missing Username', () => {
    it('should return HTTP 401 - UNAUTHORIZED', async () => {
      await expect(
        client.getAll!(headerWithoutUser)
      ).rejects.toHaveProperty('response.status', HttpStatus.UNAUTHORIZED)
    })
  })

  describe('[header] Missing Password', () => {
    it('should return HTTP 401 - UNAUTHORIZED', async () => {
      await expect(
        client.getAll!(headerWithoutPassword)
      ).rejects.toHaveProperty('response.status', HttpStatus.UNAUTHORIZED)
    })
  })

  describe('[header] Valid header without permission', () => {
    it('should return HTTP 403 - FORBIDDEN', async () => {
      await expect(
        client.getAll!(headerForbidden)
      ).rejects.toHaveProperty('response.status', HttpStatus.FORBIDDEN)
    })
  })
})
