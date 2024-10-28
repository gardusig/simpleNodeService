import { AuthenticationClient } from "../../shared/client/client.authentication";
import { UserServiceClient } from "../client/user.client";
import { CreateUserRequest, UpdateUserRequest } from "../dto/user.request.dto";

const baseUrl = "http://localhost:3000/api";

const authenticationClient = new AuthenticationClient();
const userServiceClient = new UserServiceClient(
  baseUrl,
).withAuthenticationClient(authenticationClient);

const createUserRequest = new CreateUserRequest(
  "mail@example.com",
  "password123",
);

const updateUserRequest = new UpdateUserRequest(
  "updated.mail@example.com",
  "password456",
);

describe("UserServiceClient CRUD operations", () => {
  let userId: string;

  test("should delete all users", async () => {
    await deleteAllUsers();
  });

  test("should create a new user", async () => {
    const createUserResponse =
      await userServiceClient.create(createUserRequest);
    expect(createUserResponse.error).toBeUndefined();
    expect(createUserResponse.data).not.toBeNull();
    expect(createUserResponse.data?.email).toEqual(createUserRequest.email);
    userId = createUserResponse.data!.id;
  });

  test("should find created user", async () => {
    const findByResponse = await userServiceClient.findById(userId);
    expect(findByResponse.error).toBeUndefined();
    expect(findByResponse.data).not.toBeNull();
    expect(findByResponse.data?.email).toEqual(createUserRequest.email);
  });

  test("should update a user", async () => {
    const updateUserResponse = await userServiceClient.update(
      userId,
      updateUserRequest,
    );
    expect(updateUserResponse.error).toBeUndefined();
    expect(updateUserResponse.data).not.toBeNull();
    expect(updateUserResponse.data?.email).toEqual(updateUserRequest.email);
  });

  test("should delete all users", async () => {
    await deleteAllUsers();
  });
});

async function deleteAllUsers() {
  let findAllResponse = await userServiceClient.findAll();
  expect(findAllResponse.error).toBeUndefined();
  expect(findAllResponse.data).not.toBeNull();
  for (const user of findAllResponse.data!.users) {
    const deleteResponse = await userServiceClient.remove(user.id);
    expect(findAllResponse.error).toBeUndefined();
    expect(findAllResponse.data).not.toBeNull();
    expect(deleteResponse.data).toEqual(user);
  }
  findAllResponse = await userServiceClient.findAll();
  expect(findAllResponse.error).toBeUndefined();
  expect(findAllResponse.data).not.toBeNull();
  expect(findAllResponse.data?.users.length).toEqual(0);
}
