import { HEALTH_CHECK_CLIENT_CONFIG } from "../../constants";
import { AbstractClient } from "../abstract/client";

export class HealthCheckClient extends AbstractClient {
  constructor() {
    super("health_check", HEALTH_CHECK_CLIENT_CONFIG);
  }
}
