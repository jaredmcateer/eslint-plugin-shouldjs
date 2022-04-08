import {
  noPropertyAssertions,
  NO_PROPERTY_ASSERTIONS,
} from "./no-property-assertions/no-property-assertions";
import { shouldVarName, SHOULD_VAR_NAME } from "./should-var-name/should-var-name";

export const rules = {
  [NO_PROPERTY_ASSERTIONS]: noPropertyAssertions,
  [SHOULD_VAR_NAME]: shouldVarName,
};
