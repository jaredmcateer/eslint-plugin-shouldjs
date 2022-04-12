import { ConfigSettings } from ".";
import { EXPECT_SHOULD_ASSERTION } from "../rules/expect-should-assertion/expect-should-assertions";
import { NO_PROPERTY_ASSERTIONS } from "../rules/no-property-assertions/no-property-assertions";
import { SHOULD_VAR_NAME } from "../rules/should-var-name/should-var-name";

export const recommended = {
  parser: "@typescript-eslint/parser",
  parserOptions: { sourceType: "module" },
  rules: {
    [`@jaredmcateer/shouldjs/${NO_PROPERTY_ASSERTIONS}`]: ["error"],
    [`@jaredmcateer/shouldjs/${SHOULD_VAR_NAME}`]: ["error"],
    [`@jaredmcateer/shouldjs/${EXPECT_SHOULD_ASSERTION}`]: ["error"],
  },

  settings: {
    shouldVarNames: ["should"],
  } as ConfigSettings,
} as const;
