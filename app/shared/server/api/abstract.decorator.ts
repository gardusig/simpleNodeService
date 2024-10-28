import {
  applyDecorators,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiTags,
  ApiBearerAuth,
} from "@nestjs/swagger";

export function ApplyDecoratorsController(prefix: string) {
  return applyDecorators(ApiTags(prefix), Controller(prefix));
}

export function ApplyDecoratorsDelete<T>(entity: new (...args: any[]) => T) {
  return applyDecorators(
    ApiBearerAuth(),
    Delete(":id"),
    ApiOperation({ summary: `Delete a ${entity.name} by ID` }),
    ApiResponse({
      status: 200,
      description: `${entity.name} deleted successfully`,
      type: entity,
      example: {
        message: `${entity.name} deleted successfully`,
        id: "123e4567-e89b-12d3-a456-426614174000",
      },
    }),
    ApiResponse({
      status: 404,
      description: `${entity.name} not found`,
      example: {
        message: `${entity.name} not found`,
        id: "123e4567-e89b-12d3-a456-426614174000",
      },
    }),
    ApiParam({
      name: "id",
      type: String,
      description: `The ID of the ${entity.name} to delete`,
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
  );
}

export function ApplyDecoratorsGetById<T>(
  entityName: string,
  entityType: new (...args: any[]) => T,
) {
  return applyDecorators(
    ApiBearerAuth(),
    Get(":id"),
    ApiOperation({
      summary: `Retrieve a ${entityName} by ID`,
    }),
    ApiResponse({
      status: 200,
      description: `The found ${entityName}`,
      type: entityType,
      example: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Sample Name",
      },
    }),
    ApiResponse({
      status: 404,
      description: `${entityName} not found`,
      example: {
        message: `${entityName} not found`,
        id: "123e4567-e89b-12d3-a456-426614174000",
      },
    }),
  );
}

export function ApplyDecoratorsGetAll<T>(entity: new (...args: any[]) => T) {
  return applyDecorators(
    ApiBearerAuth(),
    Get(),
    ApiOperation({ summary: `Retrieve all ${entity.name}(s)` }),
    ApiResponse({
      status: 200,
      description: `List of ${entity.name}s`,
      type: [entity],
      example: [
        { id: "123e4567-e89b-12d3-a456-426614174000", name: "Sample Name" },
      ],
    }),
  );
}

export function ApplyDecoratorsCreate<T>(entity: new (...args: any[]) => T) {
  return applyDecorators(
    ApiBearerAuth(),
    Post(),
    ApiOperation({ summary: `Create a new ${entity.name}` }),
    ApiResponse({
      status: 201,
      description: `${entity.name} created successfully`,
      type: entity,
      example: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Sample Name",
      },
    }),
    ApiResponse({
      status: 400,
      description: "Invalid input",
      example: {
        message: "Invalid input",
        errors: { name: "Name is required" },
      },
    }),
    ApiBody({
      description: `The ${entity.name} entity to create`,
      type: entity,
    }),
  );
}

export function ApplyDecoratorsUpdate<T>(entity: new (...args: any[]) => T) {
  return applyDecorators(
    ApiBearerAuth(),
    Put(":id"),
    ApiOperation({ summary: `Update an existing ${entity.name} by ID` }),
    ApiResponse({
      status: 200,
      description: `${entity.name} updated successfully`,
      type: entity,
      example: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Updated Sample Name",
      },
    }),
    ApiResponse({
      status: 404,
      description: `${entity.name} not found`,
      example: {
        message: `${entity.name} not found`,
        id: "123e4567-e89b-12d3-a456-426614174000",
      },
    }),
    ApiParam({
      name: "id",
      type: String,
      description: `The ID of the ${entity.name} to update`,
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    ApiBody({
      type: entity,
      description: `The updated ${entity.name} entity`,
    }),
  );
}
