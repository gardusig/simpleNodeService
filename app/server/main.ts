import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { RandomObjectModule } from "./api/random_object/random_object.module";
import { configureSwagger } from "./docs/swagger";
import { HealthModule } from "./health/module";
import { AuthMiddleware } from "./middleware/authentication";

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
    consumer.apply(AuthMiddleware).exclude("health_check").forRoutes("*");
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["verbose"],
  });
  app.setGlobalPrefix("api");
  configureSwagger(app);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT", 3000);
  await app.listen(port);
}

bootstrap();
