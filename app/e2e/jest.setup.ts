import { HealthCheckClient } from "./api/health/client";
import { HEADER_WITH_VALID_CREDENTIALS } from "./constants";

beforeAll(async () => {
  await new HealthCheckClient().getAll!(HEADER_WITH_VALID_CREDENTIALS);
}, 30 * 1000);
