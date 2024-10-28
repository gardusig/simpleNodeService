import { ModuleMetadata, Type } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

export function createModule(
  modules: Type<any>[],
  settings: Record<string, any>
): ModuleMetadata {
  return {
    imports: [
      ...modules,
      ConfigModule.forRoot({
        isGlobal: true,
        ...settings,
      }),
    ],
  };
}
