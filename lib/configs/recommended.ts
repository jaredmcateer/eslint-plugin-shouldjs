import { ConfigSettings } from ".";

export const recommended = {
  parser: "@typescript-eslint/parser",
  parserOptions: { sourceType: "module" },
  rules: {
    "@jaredmcateer/no-property-assertions": ["error"],
  },

  settings: {
    shouldVarNames: ["should"],
  } as ConfigSettings,
} as const;
