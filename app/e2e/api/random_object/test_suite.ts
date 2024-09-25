import { AbstractTestSuite } from "../abstract/test_suite";
import { RandomObjectClient } from "./client";
import { data, updatedData } from "./mock_data";

export class RandomObjectTestSuite extends AbstractTestSuite {
  constructor() {
    super(new RandomObjectClient(), {
      idKey: "id",
      data: data,
      updatedData: updatedData,
    });
  }
}
