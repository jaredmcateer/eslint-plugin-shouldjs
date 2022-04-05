export const recommended = {
  parser: "@typescript-eslint/parser",
  parserOptions: { sourceType: "module" },
  rules: {
    "@jaredmcateer/no-property-assertions": ["error", ["should"]],
  },
} as const;
