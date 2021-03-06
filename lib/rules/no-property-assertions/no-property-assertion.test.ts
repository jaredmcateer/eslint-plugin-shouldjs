import { ESLintUtils } from "@typescript-eslint/utils";
import {
  noPropertyAssertions,
  NO_PROPERTY_ASSERTIONS,
  PROPERTY_ASSERTION_ERROR,
} from "./no-property-assertions";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run(NO_PROPERTY_ASSERTIONS, noPropertyAssertions, {
  valid: [
    { code: "foo.should.be.true();" },
    { code: "should(foo).be.false();" },
    { code: "foo.should.not.have.been.eql(bar);" },
    // This is an error but handled by another rule
    { code: "should(false);" },
    { code: "myCustomVar(foo).should.be.eql(bar);", settings: { shouldVarNames: ["myCustomVar"] } },
  ],
  invalid: [
    { code: "foo.should.be.true;", errors: [{ messageId: PROPERTY_ASSERTION_ERROR }] },
    { code: "should(foo).be.false;", errors: [{ messageId: PROPERTY_ASSERTION_ERROR }] },
    { code: "foo.should.not.have.been.eql;", errors: [{ messageId: PROPERTY_ASSERTION_ERROR }] },
    {
      code: "myCustomVar(foo).be.eql;",
      settings: { shouldVarNames: ["myCustomVar"] },
      errors: [{ messageId: PROPERTY_ASSERTION_ERROR }],
    },
  ],
});
