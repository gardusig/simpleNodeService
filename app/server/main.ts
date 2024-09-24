import { ConfigService } from '@nestjs/config'
import { configureSwagger } from './docs/swagger'
import { NestFactory } from '@nestjs/core'

import { AuthMiddleware } from './middleware/authentication'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/module'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { RandomObjectModule } from './api/random_object/random_object.module'

@Module({
  imports: [
    RandomObjectModule,
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('health_check').forRoutes('*')
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  })
  app.setGlobalPrefix('api')
  configureSwagger(app)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT', 3000)
  await app.listen(port)
}

bootstrap()
