import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClient, User } from "@prisma/client";
import { AbstractService } from "shared/server/api/abstract.service";
import {
  CreateUserRequest,
  UpdateUserRequest,
} from "user-service/dto/user.request.dto";

import {
  UserListResponse,
  UserResponse,
} from "../../user-service/dto/user.response.dto";

@Injectable()
export class UserService extends AbstractService<
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
  UserListResponse
> {
  constructor() {
    super(new PrismaClient().user, "id");
  }

  public async findByEmail(email: string): Promise<UserResponse> {
    const existingRecord = await this.findEntityBy("email", email);
    if (!existingRecord) {
      throw new NotFoundException(`Record with email ${email} not found.`);
    }
    return existingRecord;
  }

  protected getConvertedEntity(
    databaseEntity: User | null,
  ): UserResponse | null {
    if (!databaseEntity) {
      return null;
    }
    return new UserResponse(
      databaseEntity.id,
      databaseEntity.email,
      databaseEntity.createdAt,
      databaseEntity.updatedAt,
    );
  }

  protected getConvertedEntityList(
    databaseEntityList: User[] | null,
  ): UserListResponse {
    if (!databaseEntityList) {
      return new UserListResponse([]);
    }
    const convertedUsers: UserResponse[] = [];
    for (const entity of databaseEntityList) {
      const convertedEntity = this.getConvertedEntity(entity);
      if (!convertedEntity) {
        this.logger.debug(
          `Failed to convert database user entity: ${JSON.stringify(entity)}`,
        );
        continue;
      }
      convertedUsers.push(convertedEntity);
    }
    return new UserListResponse(convertedUsers);
  }
}
