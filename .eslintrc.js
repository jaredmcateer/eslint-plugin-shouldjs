"use strict";

module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  ignorePatterns: ["dist/"],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["**/*.test.ts"],
      env: { jest: true },
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
};
