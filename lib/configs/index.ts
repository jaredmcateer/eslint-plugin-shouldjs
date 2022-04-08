import { SharedConfigurationSettings } from "@typescript-eslint/utils/dist/ts-eslint";
import { recommended } from "./recommended";

export interface ConfigSettings extends SharedConfigurationSettings {
  shouldVarNames: string[];
}

export const configs = { recommended };
