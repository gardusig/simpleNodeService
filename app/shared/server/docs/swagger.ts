import { INestApplication } from "@nestjs/common/interfaces/nest-application.interface";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function configureSwagger(
  app: INestApplication,
  title = "API title",
  description = "API description",
  version = "1.0",
): void {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);
}
