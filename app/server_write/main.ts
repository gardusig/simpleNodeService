import { AppModule } from './app_module'
import { ConfigService } from '@nestjs/config'
import { configureSwagger } from '../server/docs/swagger'
import { NestFactory } from '@nestjs/core'

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
