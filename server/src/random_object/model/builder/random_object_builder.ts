import { RandomObject } from '../random_object'

export class RandomObjectBuilder {
  private charField?: string
  private booleanField?: boolean
  private intField?: number

  withCharField(charField: string): this {
    this.charField = charField
    return this
  }

  withBooleanField(booleanField: boolean): this {
    this.booleanField = booleanField
    return this
  }

  withIntField(intField: number): this {
    this.intField = intField
    return this
  }

  build(): RandomObject {
    if (this.charField === undefined) {
      throw new Error('charField is required')
    }
    if (this.booleanField === undefined) {
      throw new Error('booleanField is required')
    }
    const randomObject = new RandomObject(this.charField, this.booleanField)
    if (this.intField !== undefined) {
      randomObject.intField = this.intField
    }
    return randomObject
  }
}
