import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";

@Controller("health_check")
export class HealthController {
  private readonly service: HealthCheckService;

  constructor(service: HealthCheckService) {
    this.service = service;
  }

  @Get()
  @HealthCheck()
  check() {
    return this.service.check([]);
  }
}
