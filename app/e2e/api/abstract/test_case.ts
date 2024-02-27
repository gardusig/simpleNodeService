import { HttpStatus } from '@nestjs/common'
import { HEADER_WITH_VALID_CREDENTIALS } from '../../constants'
import { AbstractClient } from './client'
import { Decimal } from '@prisma/client/runtime/library'
import { AxiosResponse } from 'axios'

export async function asyncAssertInitialSeed(client: AbstractClient): Promise<void> {
    const response = await client.getAll!(HEADER_WITH_VALID_CREDENTIALS)!
    expect(response).toBeDefined()
    expect(response.status).toEqual(HttpStatus.OK)
    expect(response.data.length).toEqual(2)
}

export async function asyncAssertGetExistentElement(client: AbstractClient, idKey: string, inputData: any) {
    const id = getIdFromInputData(idKey, inputData)
    const response = await client.get!(HEADER_WITH_VALID_CREDENTIALS, id)!
    expect(response).toBeDefined()
    expect(response.status).toEqual(HttpStatus.OK)
    assertExpectedResponseBody(response, inputData)
}

export async function asyncAssertGetNonExistentElement(client: AbstractClient, idKey: string, inputData: any): Promise<void> {
    const id = getIdFromInputData(idKey, inputData)
    await expect(client.get!(HEADER_WITH_VALID_CREDENTIALS, id))
        .rejects.toHaveProperty('response.status', HttpStatus.NOT_FOUND)
}

export async function asyncAssertUpdateExistentElement(client: AbstractClient, idKey: string, inputData: any): Promise<void> {
    const id = getIdFromInputData(idKey, inputData)
    const response = await client.update!(HEADER_WITH_VALID_CREDENTIALS, id, inputData)!
    expect(response).toBeDefined()
    expect(response.status).toEqual(HttpStatus.OK)
    assertExpectedResponseBody(response, inputData)
    await asyncAssertGetExistentElement(client, idKey, inputData)
}

export async function asyncAssertUpdateNonExistentElement(client: AbstractClient, idKey: string, inputData: any): Promise<void> {
    const id = getIdFromInputData(idKey, inputData)
    await expect(client.update!(HEADER_WITH_VALID_CREDENTIALS, id, inputData))
        .rejects.toHaveProperty('response.status', HttpStatus.NOT_FOUND)
}

export async function asyncAssertDeleteExistentElement(client: AbstractClient, idKey: string, inputData: any): Promise<void> {
    const id = getIdFromInputData(idKey, inputData)
    const response = await client.delete!(HEADER_WITH_VALID_CREDENTIALS, id)!
    expect(response).toBeDefined()
    expect(response.status).toEqual(HttpStatus.OK)
    assertExpectedResponseBody(response, inputData)
}

export async function asyncAssertDeleteNonExistentElement(client: AbstractClient, idKey: string, inputData: any): Promise<void> {
    const id = getIdFromInputData(idKey, inputData)
    await expect(client.delete!(HEADER_WITH_VALID_CREDENTIALS, id))
        .rejects.toHaveProperty('response.status', HttpStatus.NOT_FOUND)
}

export async function asyncAssertAddExistentElement(client: AbstractClient, inputData: any) {
    await expect(client.create!(HEADER_WITH_VALID_CREDENTIALS, inputData))
        .rejects.toHaveProperty('response.status', HttpStatus.CONFLICT)
}

export async function asyncAssertAddNonExistentElement(client: AbstractClient, idKey: string, inputData: any) {
    const response = await client.create!(HEADER_WITH_VALID_CREDENTIALS, inputData)!
    expect(response).toBeDefined()
    expect(response.status).toEqual(HttpStatus.CREATED)
    assertExpectedResponseBody(response, inputData)
    await asyncAssertGetExistentElement(client, idKey, inputData)
}

export async function asyncAssertDeleteAllExistingElements(client: AbstractClient, idKey: string) {
    const response = await client.getAll!(HEADER_WITH_VALID_CREDENTIALS)!
    expect(response).toBeDefined()
    expect(response.status).toEqual(HttpStatus.OK)
    const data = response.data as any[]
    expect(data.length).toEqual(3)
    await Promise.all(data.map((element) => {
        return asyncAssertDeleteExistentElement(client, idKey, element)
    }))
    await asyncAssertGetAllIsEmpty(client)
}

export async function asyncAssertGetAllIsEmpty(client: AbstractClient): Promise<void> {
    const response = await client.getAll!(HEADER_WITH_VALID_CREDENTIALS)!
    expect(response).toBeDefined()
    expect(response.status).toEqual(HttpStatus.OK)
    expect(response.data.length).toEqual(0)
}

function assertExpectedResponseBody(response: AxiosResponse<any, any>, expectedOutputData: any): void {
    const receivedResponseData = removeNullProperties(response.data)
    const expectedResponseData = removeNullProperties(
        convertPropertiesToString(expectedOutputData)
    )
    expect(receivedResponseData).toEqual(expectedResponseData)
}

function removeNullProperties(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    if (Array.isArray(obj)) {
        return obj.map(removeNullProperties)
    }
    return Object.fromEntries(Object.entries(obj)
        .filter(([key, value]) => key !== null && value !== null)
        .map(([key, value]) => [key, removeNullProperties(value)])
    )
}

function convertPropertiesToString(expectedOutputData: any): any {
    return Object.entries(expectedOutputData).reduce((newData: any, [key, value]) => {
        if (value instanceof Decimal) {
            newData[key] = value.toString()
        } else if (typeof value === 'number') {
            newData[key] = String(value)
        } else if (Array.isArray(value)) {
            newData[key] = value.map((item: any) =>
                typeof item === 'number' ? String(item) : item
            )
        } else {
            newData[key] = value
        }
        return newData
    }, {})
}

function getIdFromInputData(idKey: string, inputData: any): string {
    return `${inputData[idKey]}`
}
