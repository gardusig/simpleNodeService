import { AbstractClient } from './client'
import {
    asyncAssertAddExistentElement,
    asyncAssertAddNonExistentElement,
    asyncAssertDeleteAllExistingElements,
    asyncAssertDeleteNonExistentElement,
    asyncAssertGetNonExistentElement,
    asyncAssertInitialSeed,
    asyncAssertUpdateExistentElement,
    asyncAssertUpdateNonExistentElement,
} from './test_case'

interface TestDefinition {
    name: string
    description: string
    testFunction: () => Promise<void>
}

interface MockData {
    idKey: string
    data: any
    updatedData: any
}

export abstract class AbstractTestSuite {
    private tests: TestDefinition[]

    constructor(client: AbstractClient, mockData: MockData) {
        this.tests = [
            createInitialSeedTest(client),
            createGetNonExistentElementTest(client, mockData),
            createUpdateNonExistentElementTest(client, mockData),
            createDeleteNonExistentElementTest(client, mockData),
            createAddNonExistentElementTest(client, mockData),
            createAddExistentElementTest(client, mockData),
            createUpdateExistentElementTest(client, mockData),
            createDeleteAllExistingElementsTest(client, mockData),
        ]
    }

    protected addTest(test: TestDefinition): void {
        this.tests.push(test)
    }

    async runTests(): Promise<void> {
        for (const test of this.tests) {
            describe(test.name, () => {
                it(test.description, async () => {
                    await expect(test.testFunction()).resolves.not.toThrow()
                })
            })
        }
    }
}

function createInitialSeedTest(client: AbstractClient): TestDefinition {
    return {
        name: 'Assert initial seed',
        description: 'should return list with 2 items',
        testFunction: () => asyncAssertInitialSeed(
            client
        ),
    }
}

function createGetNonExistentElementTest(client: AbstractClient, mockData: MockData): TestDefinition {
    return {
        name: 'Get non existent element',
        description: 'should return NOT_FOUND',
        testFunction: () => asyncAssertGetNonExistentElement(
            client, mockData.idKey, mockData.data,
        ),
    }
}

function createUpdateNonExistentElementTest(client: AbstractClient, mockData: MockData): TestDefinition {
    return {
        name: 'Update non existent element',
        description: 'should return NOT_FOUND',
        testFunction: () => asyncAssertUpdateNonExistentElement(
            client, mockData.idKey, mockData.updatedData
        ),
    }
}

function createUpdateExistentElementTest(client: AbstractClient, mockData: MockData): TestDefinition {
    return {
        name: 'Update existent element',
        description: 'should return OK',
        testFunction: () => asyncAssertUpdateExistentElement(
            client, mockData.idKey, mockData.updatedData,
        ),
    }
}

function createDeleteNonExistentElementTest(client: AbstractClient, mockData: MockData): TestDefinition {
    return {
        name: 'Delete non existent element',
        description: 'should return NOT_FOUND',
        testFunction: () => asyncAssertDeleteNonExistentElement(
            client, mockData.idKey, mockData.data,
        ),
    }
}

function createDeleteAllExistingElementsTest(client: AbstractClient, mockData: MockData): TestDefinition {
    return {
        name: 'Delete all existing elements',
        description: 'should return empty list',
        testFunction: () => asyncAssertDeleteAllExistingElements(
            client, mockData.idKey
        ),
    }
}

function createAddNonExistentElementTest(client: AbstractClient, mockData: MockData): TestDefinition {
    return {
        name: 'Add non existent element',
        description: 'should return CREATED and OK',
        testFunction: () => asyncAssertAddNonExistentElement(
            client, mockData.idKey, mockData.data,
        ),
    }
}

function createAddExistentElementTest(client: AbstractClient, mockData: MockData): TestDefinition {
    return {
        name: 'Add existent element',
        description: 'should return CONFLICT',
        testFunction: () => asyncAssertAddExistentElement(
            client, mockData.data,
        ),
    }
}
