import { Body, Param } from "@nestjs/common";
import { User } from "@prisma/client";
import {
  CreateUserRequest,
  UpdateUserRequest,
} from "user-service/dto/user.request.dto";

import { AbstractController } from "../../shared/server/api/abstract.controller";
import {
  ApplyDecoratorsController,
  ApplyDecoratorsCreate,
  ApplyDecoratorsDelete,
  ApplyDecoratorsGetAll,
  ApplyDecoratorsGetById,
  ApplyDecoratorsUpdate,
} from "../../shared/server/api/abstract.decorator";
import {
  UserListResponse,
  UserResponse,
} from "../../user-service/dto/user.response.dto";
import { UserService } from "./user.service";

@ApplyDecoratorsController("user")
export class UserController extends AbstractController<
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
  UserListResponse
> {
  constructor(service: UserService) {
    super(service);
  }

  @ApplyDecoratorsGetById("user", UserResponse)
  public async findById(@Param("id") id: string): Promise<UserResponse | null> {
    return await super.findById(id);
  }

  @ApplyDecoratorsGetAll(UserListResponse)
  public async findAll(): Promise<UserListResponse | null> {
    return await super.findAll();
  }

  @ApplyDecoratorsCreate(UserResponse)
  public async create(
    @Body() entity: CreateUserRequest,
  ): Promise<UserResponse | null> {
    return await super.create(entity);
  }

  @ApplyDecoratorsUpdate(UserResponse)
  public async update(
    @Param("id") id: string,
    @Body() entity: UpdateUserRequest,
  ): Promise<UserResponse | null> {
    return await super.update(id, entity);
  }

  @ApplyDecoratorsDelete(UserResponse)
  public async delete(@Param("id") id: string): Promise<UserResponse | null> {
    return await super.delete(id);
  }
}
