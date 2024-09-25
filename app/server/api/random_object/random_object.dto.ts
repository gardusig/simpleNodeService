import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsString,
  IsInt,
  IsBoolean,
  IsDate,
  IsEnum,
  IsJSON,
} from "class-validator";

export enum RandomObjectEnum {
  KAPPA = "KAPPA",
  KEEPO = "KEEPO",
}

export class RandomObjectDto {
  @ApiProperty({ description: "The unique identifier of the RandomObject" })
  @IsString()
  id: string;

  @ApiProperty({ description: "String value of the RandomObject" })
  @IsString()
  stringValue: string;

  @ApiProperty({ description: "Integer value of the RandomObject" })
  @IsInt()
  intValue: number;

  @ApiProperty({ description: "Float value of the RandomObject" })
  @Type(() => Number)
  floatValue: number;

  @ApiProperty({ description: "Boolean value of the RandomObject" })
  @IsBoolean()
  booleanValue: boolean;

  @ApiProperty({ description: "DateTime value of the RandomObject" })
  @IsDate()
  @Type(() => Date)
  dateTimeValue: Date;

  @ApiProperty({ description: "JSON value of the RandomObject", type: Object })
  @IsJSON()
  jsonValue: any;

  @ApiProperty({
    description: "Enum value of the RandomObject",
    enum: RandomObjectEnum,
  })
  @IsEnum(RandomObjectEnum)
  enumValue: RandomObjectEnum;

  constructor(
    id: string,
    stringValue: string,
    intValue: number,
    floatValue: number,
    booleanValue: boolean,
    dateTimeValue: Date,
    jsonValue: any,
    enumValue: RandomObjectEnum,
  ) {
    this.id = id;
    this.stringValue = stringValue;
    this.intValue = intValue;
    this.floatValue = floatValue;
    this.booleanValue = booleanValue;
    this.dateTimeValue = dateTimeValue;
    this.jsonValue = jsonValue;
    this.enumValue = enumValue;
  }
}
