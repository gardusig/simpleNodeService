import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserRequest {
  @ApiProperty({ description: "The email address of the User", type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "The password of the User", type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class UpdateUserRequest {
  @ApiProperty({ description: "The email address of the User", type: String })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: "The password of the User", type: String })
  @IsString()
  @IsOptional()
  password?: string;

  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }
}

export class DeleteUserRequest {
  @ApiProperty({
    description: "The unique identifier of the User",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
