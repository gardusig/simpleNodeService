import { INestApplication } from "@nestjs/common/interfaces/nest-application.interface";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function configureSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle("Your API")
    .setDescription("API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);
}
