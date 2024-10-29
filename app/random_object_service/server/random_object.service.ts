import { Injectable } from "@nestjs/common";
import { PrismaClient, RandomObject } from "@prisma/client";
import {
  CreateRandomObjectRequest,
  UpdateRandomObjectRequest,
} from "random_object_service/dto/random_object.request.dto";
import { AbstractService } from "shared/server/api/abstract.service";

import { RandomObjectEnum } from "../dto/random_object.enum.dto";
import {
  RandomObjectListResponse,
  RandomObjectResponse,
} from "../dto/random_object.response.dto";

@Injectable()
export class RandomObjectService extends AbstractService<
  RandomObject,
  CreateRandomObjectRequest,
  UpdateRandomObjectRequest,
  RandomObjectResponse,
  RandomObjectListResponse
> {
  constructor() {
    super(new PrismaClient().randomObject, "id");
  }

  protected getConvertedEntity(
    databaseEntity: RandomObject | null,
  ): RandomObjectResponse | null {
    if (!databaseEntity) {
      return null;
    }
    const jsonValue: Record<string, any> =
      databaseEntity.jsonValue === null
        ? {}
        : (databaseEntity.jsonValue as Record<string, any>);
    const enumValue: RandomObjectEnum =
      RandomObjectEnum[
        databaseEntity.enumValue as keyof typeof RandomObjectEnum
      ];
    return new RandomObjectResponse(
      databaseEntity.id,
      databaseEntity.stringValue,
      databaseEntity.intValue,
      databaseEntity.floatValue,
      databaseEntity.booleanValue,
      databaseEntity.dateTimeValue,
      jsonValue,
      enumValue,
    );
  }

  protected getConvertedEntityList(
    databaseEntityList: RandomObject[] | null,
  ): RandomObjectListResponse {
    if (!databaseEntityList) {
      return new RandomObjectListResponse([]);
    }
    const convertedRandomObjects: RandomObjectResponse[] = [];
    for (const entity of databaseEntityList) {
      const convertedEntity = this.getConvertedEntity(entity);
      if (!convertedEntity) {
        this.logger.debug(
          `Failed to convert database user entity: ${JSON.stringify(entity)}`,
        );
        continue;
      }
      convertedRandomObjects.push(convertedEntity);
    }
    return new RandomObjectListResponse(convertedRandomObjects);
  }
}
