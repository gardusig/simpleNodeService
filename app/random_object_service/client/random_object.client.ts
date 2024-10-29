import {
  CreateRandomObjectRequest,
  UpdateRandomObjectRequest,
} from "random_object_service/dto/random_object.request.dto";
import {
  RandomObjectListResponse,
  RandomObjectResponse,
} from "random_object_service/dto/random_object.response.dto";

import { AbstractApiClient } from "../../shared/client/client.abstract";

export class RandomObjectServiceClient extends AbstractApiClient<
  CreateRandomObjectRequest,
  UpdateRandomObjectRequest,
  RandomObjectResponse,
  RandomObjectListResponse
> {
  constructor(baseUrl: string) {
    super(baseUrl, "random_object");
  }
}
