import { AbstractApiClient } from "../../shared/client/client.abstract";
import { CreateUserRequest, UpdateUserRequest } from "../dto/random_object.request.dto";
import { UserListResponse, UserResponse } from "../dto/random_object.response.dto";

export class UserServiceClient extends AbstractApiClient<
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
  UserListResponse
> {
  constructor(baseUrl: string) {
    super(baseUrl, "user");
  }
}
