import { AuthMiddleware } from './middleware/authentication'
import { RandomObjectModule } from './api/random_object/module'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './api/health/module'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { PrismaClientModule } from './prisma_client/module'

@Module({
  imports: [
    PrismaClientModule,
    RandomObjectModule,
    HealthModule,
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
