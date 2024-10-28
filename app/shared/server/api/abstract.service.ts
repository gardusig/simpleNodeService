import { Logger } from "@nestjs/common";

export interface DatabaseMethods<DatabaseEntity> {
  findUnique(...args: any): Promise<DatabaseEntity | null>;
  findMany(...args: any): Promise<DatabaseEntity[]>;
  create(...args: any): Promise<DatabaseEntity>;
  update(...args: any): Promise<DatabaseEntity>;
  delete(...args: any): Promise<DatabaseEntity>;
}

export abstract class AbstractService<
  DatabaseEntity,
  CreateRequestDto,
  UpdateRequestDto,
  ResponseDto,
  ResponseListDto,
> {
  protected readonly logger = new Logger(AbstractService.name);
  protected readonly database: DatabaseMethods<DatabaseEntity>;

  private readonly idKey: string;

  constructor(database: DatabaseMethods<DatabaseEntity>, idKey: string) {
    this.database = database;
    this.idKey = idKey;
  }

  protected abstract getConvertedEntity(
    databaseEntity: DatabaseEntity | null,
  ): ResponseDto | null;

  protected abstract getConvertedEntityList(
    databaseEntityList: DatabaseEntity[] | null,
  ): ResponseListDto | null;

  public async findById(id: string): Promise<ResponseDto | null> {
    try {
      return await this.findEntityBy(this.idKey, id);
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  public async findAll(): Promise<ResponseListDto | null> {
    try {
      const databaseEntityList = await this.database.findMany();
      return this.getConvertedEntityList(databaseEntityList);
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  public async remove(id: string): Promise<ResponseDto | null> {
    try {
      const databaseEntity = await this.database.delete({
        where: { [this.idKey]: id },
      });
      return this.getConvertedEntity(databaseEntity);
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  public async update(
    id: string,
    entity: UpdateRequestDto,
  ): Promise<ResponseDto | null> {
    try {
      const updatedEntity = await this.database.update({
        where: { [this.idKey]: id },
        data: entity,
      });
      return this.getConvertedEntity(updatedEntity);
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  public async add(entity: CreateRequestDto): Promise<ResponseDto | null> {
    try {
      const databaseEntity = await this.database.create({ data: entity });
      return this.getConvertedEntity(databaseEntity);
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  protected async findEntityBy(
    key: string,
    value: any,
  ): Promise<ResponseDto | null> {
    try {
      const databaseEntity = await this.database.findUnique({
        where: { [key]: value },
      });
      return this.getConvertedEntity(databaseEntity);
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  protected async findEntityWhere(
    whereClause: Record<string, any>,
  ): Promise<DatabaseEntity | null> {
    try {
      return await this.database.findUnique({
        where: whereClause,
      });
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  protected handleError(error: any): void {
    this.logger.error(
      `Database operation failed: ${error.message}`,
      error.stack,
    );
    throw error;
  }
}
