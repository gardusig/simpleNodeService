import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { RandomObjectEnum } from "./random_object.enum.dto";

export class CreateRandomObjectRequest {
  @ApiProperty({
    description: "String value of the RandomObject",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  stringValue: string;

  @ApiProperty({
    description: "Integer value of the RandomObject",
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  intValue: number;

  @ApiProperty({ description: "Float value of the RandomObject", type: Number })
  @IsNotEmpty()
  floatValue: number;

  @ApiProperty({
    description: "Boolean value of the RandomObject",
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  booleanValue: boolean;

  @ApiProperty({
    description: "Date and time value of the RandomObject",
    type: String,
    format: "date-time",
  })
  @IsDateString()
  @IsNotEmpty()
  dateTimeValue: string;

  @ApiProperty({
    description: "JSON value of the RandomObject",
    type: "object",
  })
  @IsJSON()
  @IsNotEmpty()
  jsonValue: any;

  @ApiProperty({
    description: "Enum value of the RandomObject",
    enum: RandomObjectEnum,
  })
  @IsEnum(RandomObjectEnum)
  @IsNotEmpty()
  enumValue: RandomObjectEnum;

  constructor(
    stringValue: string,
    intValue: number,
    floatValue: number,
    booleanValue: boolean,
    dateTimeValue: string,
    jsonValue: any,
    enumValue: RandomObjectEnum,
  ) {
    this.stringValue = stringValue;
    this.intValue = intValue;
    this.floatValue = floatValue;
    this.booleanValue = booleanValue;
    this.dateTimeValue = dateTimeValue;
    this.jsonValue = jsonValue;
    this.enumValue = enumValue;
  }
}

export class UpdateRandomObjectRequest {
  @ApiProperty({
    description: "String value of the RandomObject",
    type: String,
  })
  @IsString()
  @IsOptional()
  stringValue?: string;

  @ApiProperty({
    description: "Integer value of the RandomObject",
    type: Number,
  })
  @IsInt()
  @IsOptional()
  intValue?: number;

  @ApiProperty({ description: "Float value of the RandomObject", type: Number })
  @IsOptional()
  floatValue?: number;

  @ApiProperty({
    description: "Boolean value of the RandomObject",
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  booleanValue?: boolean;

  @ApiProperty({
    description: "Date and time value of the RandomObject",
    type: String,
    format: "date-time",
  })
  @IsDateString()
  @IsOptional()
  dateTimeValue?: string;

  @ApiProperty({
    description: "JSON value of the RandomObject",
    type: "object",
  })
  @IsJSON()
  @IsOptional()
  jsonValue?: any;

  @ApiProperty({
    description: "Enum value of the RandomObject",
    enum: RandomObjectEnum,
  })
  @IsEnum(RandomObjectEnum)
  @IsOptional()
  enumValue?: RandomObjectEnum;

  constructor(
    stringValue?: string,
    intValue?: number,
    floatValue?: number,
    booleanValue?: boolean,
    dateTimeValue?: string,
    jsonValue?: any,
    enumValue?: RandomObjectEnum,
  ) {
    this.stringValue = stringValue;
    this.intValue = intValue;
    this.floatValue = floatValue;
    this.booleanValue = booleanValue;
    this.dateTimeValue = dateTimeValue;
    this.jsonValue = jsonValue;
    this.enumValue = enumValue;
  }
}

export class DeleteRandomObjectRequest {
  @ApiProperty({
    description: "The unique identifier of the RandomObject",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
