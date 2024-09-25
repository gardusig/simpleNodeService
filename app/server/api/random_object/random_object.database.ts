import { Injectable } from "@nestjs/common";
import { PrismaClient, RandomObject } from "@prisma/client";

import { AbstractDatabase } from "../abstract/abstract.database";

export const RandomObjectDatabaseToken = "RandomObjectDatabase";

@Injectable()
export class RandomObjectDatabase extends AbstractDatabase<RandomObject> {
  constructor() {
    super(new PrismaClient().randomObject, "id");
  }
}
