import { AuthenticationClient } from "../../shared/client/client.authentication";
import { RandomObjectServiceClient } from "../client/random_object.client";
import { RandomObjectEnum } from "../dto/random_object.enum.dto";
import {
  CreateRandomObjectRequest,
  UpdateRandomObjectRequest,
} from "../dto/random_object.request.dto";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:3000/api";

console.log(`apiBaseUrl: ${apiBaseUrl}`);

const authenticationClient = new AuthenticationClient();
const randomObjectServiceClient = new RandomObjectServiceClient(
  apiBaseUrl,
).withAuthenticationClient(authenticationClient);

const createRandomObjectRequest = new CreateRandomObjectRequest(
  "Example String",
  42,
  3.14,
  true,
  "2024-01-01T00:00:00Z",
  { key: "value" },
  RandomObjectEnum.KAPPA,
);

const updateRandomObjectRequest = new UpdateRandomObjectRequest(
  "Updated String",
  100,
  9.99,
  false,
  "2024-05-05T12:00:00Z",
  { updatedKey: "newValue" },
  RandomObjectEnum.KEEPO,
);

describe("RandomObjectServiceClient CRUD operations", () => {
  let randomObjectId: string;

  test("should delete all randomObjects", async () => {
    await deleteAllRandomObjects();
  });

  test("should create a new randomObject", async () => {
    const createRandomObjectResponse = await randomObjectServiceClient.create(
      createRandomObjectRequest,
    );
    expect(createRandomObjectResponse.error).toBeUndefined();
    expect(createRandomObjectResponse.data).not.toBeNull();
    expect(createRandomObjectResponse.data?.intValue).toEqual(
      createRandomObjectRequest.intValue,
    );
    randomObjectId = createRandomObjectResponse.data!.id;
  });

  test("should find created randomObject", async () => {
    const findByResponse =
      await randomObjectServiceClient.findById(randomObjectId);
    expect(findByResponse.error).toBeUndefined();
    expect(findByResponse.data).not.toBeNull();
    expect(findByResponse.data?.intValue).toEqual(
      createRandomObjectRequest.intValue,
    );
  });

  test("should update a randomObject", async () => {
    const updateRandomObjectResponse = await randomObjectServiceClient.update(
      randomObjectId,
      updateRandomObjectRequest,
    );
    expect(updateRandomObjectResponse.error).toBeUndefined();
    expect(updateRandomObjectResponse.data).not.toBeNull();
    expect(updateRandomObjectResponse.data?.intValue).toEqual(
      updateRandomObjectRequest.intValue,
    );
  });

  test("should delete all randomObjects", async () => {
    await deleteAllRandomObjects();
  });
});

async function deleteAllRandomObjects() {
  let findAllResponse = await randomObjectServiceClient.findAll();
  expect(findAllResponse.error).toBeUndefined();
  expect(findAllResponse.data).not.toBeNull();
  for (const randomObject of findAllResponse.data!.objects) {
    const deleteResponse = await randomObjectServiceClient.remove(
      randomObject.id,
    );
    expect(findAllResponse.error).toBeUndefined();
    expect(findAllResponse.data).not.toBeNull();
    expect(deleteResponse.data).toEqual(randomObject);
  }
  findAllResponse = await randomObjectServiceClient.findAll();
  expect(findAllResponse.error).toBeUndefined();
  expect(findAllResponse.data).not.toBeNull();
  expect(findAllResponse.data?.objects.length).toEqual(0);
}
