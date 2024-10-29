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

export function ApplyDecoratorsDelete<ResponseDto>(
  entityName: string,
  responseDto: new (...args: any[]) => ResponseDto,
) {
  return applyDecorators(
    ApiBearerAuth(),
    Delete(":id"),
    ApiOperation({ summary: `Delete a ${entityName} by ID` }),
    ApiResponse({
      status: 204,
      description: `${entityName} deleted successfully`,
      type: responseDto,
    }),
    ApiResponse({
      status: 404,
      description: `${entityName} not found`,
    }),
    ApiParam({
      name: "id",
      type: String,
      description: `The ID of the ${entityName} to delete`,
    }),
  );
}

export function ApplyDecoratorsGetById<ResponseDto>(
  entityName: string,
  responseDto: new (...args: any[]) => ResponseDto,
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
      type: responseDto,
    }),
    ApiResponse({
      status: 404,
      description: `${entityName} not found`,
    }),
  );
}

export function ApplyDecoratorsGetAll<ResponseDto>(
  entityName: string,
  responseDto: new (...args: any[]) => ResponseDto,
) {
  return applyDecorators(
    ApiBearerAuth(),
    Get(),
    ApiOperation({ summary: `Retrieve all ${entityName}(s)` }),
    ApiResponse({
      status: 200,
      description: `List of ${entityName}s`,
      type: [responseDto],
    }),
  );
}

export function ApplyDecoratorsCreate<RequestDto, ResponseDto>(
  entityName: string,
  requestDto: new (...args: any[]) => RequestDto,
  responseDto: new (...args: any[]) => ResponseDto,
) {
  return applyDecorators(
    ApiBearerAuth(),
    Post(),
    ApiOperation({ summary: `Create a new ${entityName}` }),
    ApiResponse({
      status: 201,
      description: `${entityName} created successfully`,
      type: responseDto,
    }),
    ApiResponse({
      status: 400,
      description: "Invalid input",
    }),
    ApiBody({
      description: `The ${entityName} entity to create`,
      type: requestDto,
    }),
  );
}

export function ApplyDecoratorsUpdate<RequestDto, ResponseDto>(
  entityName: string,
  requestDto: new (...args: any[]) => RequestDto,
  responseDto: new (...args: any[]) => ResponseDto,
) {
  return applyDecorators(
    ApiBearerAuth(),
    Put(":id"),
    ApiOperation({ summary: `Update an existing ${entityName} by ID` }),
    ApiResponse({
      status: 200,
      description: `${entityName} updated successfully`,
      type: responseDto,
    }),
    ApiResponse({
      status: 404,
      description: `${entityName} not found`,
    }),
    ApiParam({
      name: "id",
      type: String,
      description: `The ID of the ${entityName} to update`,
    }),
    ApiBody({
      type: requestDto,
      description: `The updated ${entityName} entity`,
    }),
  );
}
