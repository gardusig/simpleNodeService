import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './module/app_module'
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

function configureSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('App')
    .setDescription('API Description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  configureSwagger(app)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT', 3000)
  await app.listen(port)
}

bootstrap()
