import { Body, Param } from "@nestjs/common";
import { RandomObject } from "@prisma/client";
import {
  CreateRandomObjectRequest,
  UpdateRandomObjectRequest,
} from "random_object_service/dto/random_object.request.dto";
import {
  RandomObjectListResponse,
  RandomObjectResponse,
} from "random_object_service/dto/random_object.response.dto";

import { AbstractController } from "../../shared/server/api/abstract.controller";
import {
  ApplyDecoratorsController,
  ApplyDecoratorsCreate,
  ApplyDecoratorsDelete,
  ApplyDecoratorsGetAll,
  ApplyDecoratorsGetById,
  ApplyDecoratorsUpdate,
} from "../../shared/server/api/abstract.decorator";
import { RandomObjectService } from "./random_object.service";

@ApplyDecoratorsController("random_object")
export class RandomObjectController extends AbstractController<
  RandomObject,
  CreateRandomObjectRequest,
  UpdateRandomObjectRequest,
  RandomObjectResponse,
  RandomObjectListResponse
> {
  constructor(service: RandomObjectService) {
    super(service);
  }

  @ApplyDecoratorsGetById("random_object", RandomObjectResponse)
  public async findById(
    @Param("id") id: string,
  ): Promise<RandomObjectResponse | null> {
    return await super.findById(id);
  }

  @ApplyDecoratorsGetAll("random_object", RandomObjectListResponse)
  public async findAll(): Promise<RandomObjectListResponse | null> {
    return await super.findAll();
  }

  @ApplyDecoratorsCreate(
    "random_object",
    CreateRandomObjectRequest,
    RandomObjectResponse,
  )
  public async create(
    @Body() entity: CreateRandomObjectRequest,
  ): Promise<RandomObjectResponse | null> {
    return await super.create(entity);
  }

  @ApplyDecoratorsUpdate(
    "random_object",
    UpdateRandomObjectRequest,
    RandomObjectResponse,
  )
  public async update(
    @Param("id") id: string,
    @Body() entity: UpdateRandomObjectRequest,
  ): Promise<RandomObjectResponse | null> {
    return await super.update(id, entity);
  }

  @ApplyDecoratorsDelete("random_object", RandomObjectResponse)
  public async delete(
    @Param("id") id: string,
  ): Promise<RandomObjectResponse | null> {
    return await super.delete(id);
  }
}
