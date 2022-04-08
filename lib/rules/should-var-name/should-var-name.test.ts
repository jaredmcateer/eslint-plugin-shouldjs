import { ESLintUtils } from "@typescript-eslint/utils";
import {
  INVALID_VAR_NAME,
  SUGGEST_FUNCTION_VAR_RENAME,
  shouldVarName,
  SHOULD_VAR_NAME,
} from "./should-var-name";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run(SHOULD_VAR_NAME, shouldVarName, {
  valid: [
    { code: `const should = require("should");` },
    { code: `import should from "should";` },
    { code: `import foo from 'foo';` },
    {
      code: `const expect = require("should");`,
      settings: { shouldVarNames: ["should", "expect", "foo"] },
    },
    {
      code: `import foo from 'should';`,
      settings: { shouldVarNames: ["should", "expect", "foo"] },
    },
    {
      // Don't check var of requires that aren't from should
      code: `const should = require('foo');`,
      settings: { shouldVarNames: ["expect", "foo"] },
    },
    {
      // Don't check var of imports that aren't from should
      code: `import should from 'foo';`,
      settings: { shouldVarNames: ["expect", "foo"] },
    },
  ],
  invalid: [
    {
      code: `const expect = require("should");`,
      errors: [
        {
          messageId: INVALID_VAR_NAME,
          suggestions: [
            {
              messageId: SUGGEST_FUNCTION_VAR_RENAME,
              output: `const should = require("should");`,
            },
          ],
        },
      ],
    },
    {
      code: `const should = require("should");`,
      settings: { shouldVarNames: ["expect", "foo"] },
      errors: [
        {
          messageId: INVALID_VAR_NAME,
          suggestions: [
            {
              messageId: SUGGEST_FUNCTION_VAR_RENAME,
              output: `const expect = require("should");`,
            },
            {
              messageId: SUGGEST_FUNCTION_VAR_RENAME,
              output: `const foo = require("should");`,
            },
          ],
        },
      ],
    },
    {
      code: `import foo from "should";`,
      errors: [
        {
          messageId: INVALID_VAR_NAME,
          suggestions: [
            {
              messageId: SUGGEST_FUNCTION_VAR_RENAME,
              output: `import should from "should";`,
            },
          ],
        },
      ],
    },
    {
      code: `import should from "should";`,
      settings: { shouldVarNames: ["expect", "foo"] },
      errors: [
        {
          messageId: INVALID_VAR_NAME,
          suggestions: [
            {
              messageId: SUGGEST_FUNCTION_VAR_RENAME,
              output: `import expect from "should";`,
            },
            {
              messageId: SUGGEST_FUNCTION_VAR_RENAME,
              output: `import foo from "should";`,
            },
          ],
        },
      ],
    },
  ],
});
