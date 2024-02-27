import { Logger } from '@nestjs/common'
import { Prisma, PrismaClient, RandomObject, RandomObjectEnum } from '@prisma/client'

const prisma = new PrismaClient()

const randomObjectMockData: RandomObject[] = [
  {
    id: 1,
    stringValue: 'Example String 1',
    intValue: 42,
    floatValue: 3.14,
    booleanValue: true,
    dateTimeValue: new Date(),
    jsonValue: { key: 'value' },
    enumValue: RandomObjectEnum.KAPPA,
  },
  {
    id: 2,
    stringValue: 'Example String 2',
    intValue: 123,
    floatValue: 2.718,
    booleanValue: false,
    dateTimeValue: new Date(),
    jsonValue: { anotherKey: 'anotherValue' },
    enumValue: RandomObjectEnum.KEEPO,
  },
]

async function insertMockedData() {
  await Promise.all(
    randomObjectMockData.map((mockData: RandomObject) => {
      return prisma.randomObject.create({ data: mockData as Prisma.RandomObjectCreateInput })
    })
  )
}

async function main() {
  insertMockedData().then(async () => {
    await prisma.$disconnect()
  }).catch(async (e) => {
    Logger.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
}

main()
