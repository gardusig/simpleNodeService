import { AbstractTestSuite } from "./abstract/test_suite";
import { RandomObjectTestSuite } from "./random_object/test_suite";

const testSuites: AbstractTestSuite[] = [new RandomObjectTestSuite()];

async function runTests() {
  await Promise.all(
    testSuites.map((testSuite) => {
      return new Promise(() => {
        describe(testSuite.constructor.name, () => {
          testSuite.runTests();
        });
      });
    }),
  );
}

runTests();
