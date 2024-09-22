// import { AuthMiddleware } from './middleware/authentication'
// import { ConfigModule } from '@nestjs/config'
// import { ConfigService } from '@nestjs/config'
// import { configureSwagger } from './docs/swagger'
// import { HealthModule } from './health/module'
// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
// import { NestFactory } from '@nestjs/core'
// import { PrismaClientModule } from './prisma_client/module'
// import { RandomObjectReadModule } from './random_object/module'

// @Module({
//   imports: [
//     PrismaClientModule,
//     RandomObjectReadModule,
//     HealthModule,
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//   ],
// })
// export class ReadModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).exclude('health_check').forRoutes('*')
//   }
// }

// async function bootstrap() {
//   const app = await NestFactory.create(ReadModule, {
//     logger: ['verbose'],
//   })
//   app.setGlobalPrefix('api')
//   app.enableCors()
//   configureSwagger(app)
//   const configService = app.get(ConfigService)
//   const port = configService.get<number>('PORT', 3000)
//   await app.listen(port)
// }

// bootstrap()
