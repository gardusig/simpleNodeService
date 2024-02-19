import { CasinoGame } from 'server/api/random_object/model'
import { Decimal } from '@prisma/client/runtime/library'

export const data: CasinoGame = {
  name: 'Game Name',
  slug: 'game-slug',
  gameId: 'test-game123',
  uuid: '123e4567-e89b-12d3-a456-426614174001',
  providerId: 'provider123',
  rank: new Decimal(5),
  isEnabled: true,
  isDesktop: true,
  isMobile: true,
  isBranded: true,
  isPopular: true,
  onHome: true,
  hasDemo: true,
  hasJackpot: true,
  freeGamesSupport: true,
  type: 'slot',
  volatility: 'low',
  rtp: new Decimal(95.5),
  payoutDeclared: new Decimal(1000.25),
}

export const updatedData: CasinoGame = {
  ...data,
  isEnabled: false,
}
