import { Module } from "@nestjs/common";

import { RandomObjectController } from "./random_object.controller";
import { RandomObjectService } from "./random_object.service";

@Module({
  controllers: [RandomObjectController],
  providers: [RandomObjectService],
})
export class RandomObjectModule {}
