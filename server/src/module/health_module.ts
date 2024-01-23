import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from '../health/controller/health_controller'

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
