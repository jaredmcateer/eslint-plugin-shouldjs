import { ESLintUtils } from "@typescript-eslint/utils";
import {
  ADD_ASSERTION_MESSAGE,
  expectShouldAssertion,
  EXPECT_SHOULD_ASSERTION,
} from "./expect-should-assertions";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run(EXPECT_SHOULD_ASSERTION, expectShouldAssertion, {
  valid: [
    { code: "should(foo).be.true();" },
    { code: "should(foo);", settings: { shouldVarNames: ["expect"] } },
  ],
  invalid: [
    { code: "should(foo);", errors: [{ messageId: ADD_ASSERTION_MESSAGE }] },
    {
      code: "expect();",
      settings: { shouldVarNames: ["expect"] },
      errors: [{ messageId: ADD_ASSERTION_MESSAGE }],
    },
  ],
});
