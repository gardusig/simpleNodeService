import { ApiProperty } from '@nestjs/swagger'

export class RandomObject {
  @ApiProperty({
    description: 'random char field',
    example: 'teste',
  })
  charField: string

  @ApiProperty({
    description: 'random boolean field',
    example: true,
  })
  booleanField: boolean

  @ApiProperty({
    description: 'random int field',
    example: 1,
    required: false,
  })
  intField?: number

  constructor(charField: string, booleanField: boolean) {
    this.charField = charField
    this.booleanField = booleanField
  }
}
