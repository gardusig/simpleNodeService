import { Logger } from "@nestjs/common";

import { AbstractService } from "./abstract.service";

export abstract class AbstractController<
  DatabaseEntity,
  RequestCreateUser,
  RequestUpdateUser,
  ResponseDto,
  ResponseListDto,
> {
  protected readonly logger = new Logger(AbstractController.name);
  protected readonly service: AbstractService<
    DatabaseEntity,
    RequestCreateUser,
    RequestUpdateUser,
    ResponseDto,
    ResponseListDto
  >;

  constructor(
    service: AbstractService<
      DatabaseEntity,
      RequestCreateUser,
      RequestUpdateUser,
      ResponseDto,
      ResponseListDto
    >,
  ) {
    this.service = service;
  }

  protected async findById(id: string): Promise<ResponseDto | null> {
    return await this.service.findById(id);
  }

  protected async findAll(): Promise<ResponseListDto | null> {
    return await this.service.findAll();
  }

  protected async create(
    entity: RequestCreateUser,
  ): Promise<ResponseDto | null> {
    return await this.service.add(entity);
  }

  protected async update(
    id: string,
    entity: RequestUpdateUser,
  ): Promise<ResponseDto | null> {
    return await this.service.update(id, entity);
  }

  public async delete(id: string): Promise<ResponseDto | null> {
    return await this.service.remove(id);
  }
}
