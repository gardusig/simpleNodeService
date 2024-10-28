import { ApiProperty } from "@nestjs/swagger";

export class UserResponse {
  @ApiProperty({
    description: "The unique identifier of the User",
    type: String,
  })
  id: string;

  @ApiProperty({ description: "The email address of the User", type: String })
  email: string;

  @ApiProperty({
    description: "The date when the User was created",
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: "The date when the User was last updated",
    type: Date,
  })
  updatedAt: Date;

  constructor(id: string, email: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class UserListResponse {
  @ApiProperty({ description: "List of Users", type: [UserResponse] })
  users: UserResponse[];

  constructor(users: UserResponse[]) {
    this.users = users;
  }
}
