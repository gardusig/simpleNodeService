import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface'
import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { serve, setup } from 'swagger-ui-express'

export function configureSwagger(app: INestApplication): void {
  const openApiYaml = readFileSync('openapi.yml', 'utf8')
  const openApiDocumentation: any = load(openApiYaml)
  app.use('/docs', serve, setup(openApiDocumentation))
}
