import { RandomObject, RandomObjectEnum } from '@prisma/client'

export const data: RandomObject = {
  id: 3,
  stringValue: 'Example String 3',
  intValue: 420,
  floatValue: 3.1415,
  booleanValue: true,
  dateTimeValue: new Date(),
  jsonValue: { key: 'value' },
  enumValue: RandomObjectEnum.KAPPA,
}

export const updatedData: RandomObject = {
  ...data,
  enumValue: RandomObjectEnum.KEEPO,
}
