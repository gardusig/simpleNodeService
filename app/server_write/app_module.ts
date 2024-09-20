import { AuthMiddleware } from '../server/middleware/authentication'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from '../server/api/health/module'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { PrismaClientModule } from '../server/prisma_client/module'
import { RandomObjectWriteModule } from './random_object/module'

@Module({
  imports: [
    PrismaClientModule,
    RandomObjectWriteModule,
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
