import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { ConfigSettings } from "../../configs";
import { createRule } from "../../utils/create-rule";

export const EXPECT_SHOULD_ASSERTION = "expect-should-assertion";
export const ADD_ASSERTION_MESSAGE = "missingAssertionError";

type MessageIds = typeof ADD_ASSERTION_MESSAGE;

export const expectShouldAssertion = createRule<[], MessageIds>({
  name: EXPECT_SHOULD_ASSERTION,
  meta: {
    docs: {
      description: "Should.js function calls should be chained with an assertion.",
      recommended: "error",
      requiresTypeChecking: false,
    },
    messages: {
      [ADD_ASSERTION_MESSAGE]: "Should.js function calls should be chained with an assertion.",
    },
    schema: [],
    hasSuggestions: false,
    type: "problem",
  },
  defaultOptions: [],
  create(context) {
    const validVarNames = (context.settings as ConfigSettings).shouldVarNames || ["should"];

    return {
      /**
       * When encountering an CallExpression with expected name (i.e., should),
       * Check the parents if it is an ExpressionStatement then report an error.
       */
      CallExpression(node) {
        if (node?.callee?.type !== AST_NODE_TYPES.Identifier) return;

        // If CallExpression isn't an expected variable name then stop here
        const name = node.callee.name;
        if (!validVarNames?.find((varName) => varName === name)) return;

        // If we've hit an Expression statement it means that the Should.js
        // function var is being called without an assertion.
        if (node.parent?.type === AST_NODE_TYPES.ExpressionStatement) {
          context.report({
            messageId: ADD_ASSERTION_MESSAGE,
            node,
          });
        }
      },
    };
  },
});
