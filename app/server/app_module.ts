import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './api/health/module'
import { CasinoProviderModule } from './api/provider/module'
import { CasinoGameModule } from './api/random_object/module'
import { PlayerModule } from './api/player/module'
import { AuthMiddleware } from './middleware/authentication'
import { PrismaClientModule } from './prisma_client/module'
import { CasinoGameCallModule } from './api/gameCall/module'
import { TournamentModule } from './api/tournament/module'
import { TransactionModule } from './api/transaction/module'

@Module({
  imports: [
    PrismaClientModule,
    CasinoGameModule,
    CasinoProviderModule,
    HealthModule,
    PlayerModule,
    CasinoGameCallModule,
    TournamentModule,
    TransactionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('health_check').forRoutes('*')
  }
}
