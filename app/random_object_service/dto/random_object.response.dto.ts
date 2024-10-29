import { ApiProperty } from "@nestjs/swagger";

import { RandomObjectEnum } from "./random_object.enum.dto";

export class RandomObjectResponse {
  @ApiProperty({
    description: "The unique identifier of the RandomObject",
    type: String,
  })
  id: string;

  @ApiProperty({
    description: "A string value of the RandomObject",
    type: String,
  })
  stringValue: string;

  @ApiProperty({
    description: "An integer value of the RandomObject",
    type: Number,
  })
  intValue: number;

  @ApiProperty({
    description: "A float value of the RandomObject",
    type: Number,
  })
  floatValue: number;

  @ApiProperty({
    description: "A boolean value of the RandomObject",
    type: Boolean,
  })
  booleanValue: boolean;

  @ApiProperty({
    description: "A DateTime value of the RandomObject",
    type: Date,
  })
  dateTimeValue: Date;

  @ApiProperty({
    description: "A JSON object value of the RandomObject",
    type: Object,
  })
  jsonValue: Record<string, any>; // Use `Record<string, any>` for JSON values

  @ApiProperty({
    description: "An enum value representing the type of RandomObject",
    enum: RandomObjectEnum,
  })
  enumValue: RandomObjectEnum;

  constructor(
    id: string,
    stringValue: string,
    intValue: number,
    floatValue: number,
    booleanValue: boolean,
    dateTimeValue: Date,
    jsonValue: Record<string, any>,
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

export class RandomObjectListResponse {
  @ApiProperty({
    description: "List of RandomObjects",
    type: [RandomObjectResponse],
  })
  objects: RandomObjectResponse[];

  constructor(objects: RandomObjectResponse[]) {
    this.objects = objects;
  }
}
