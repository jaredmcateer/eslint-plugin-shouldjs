import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { ReportSuggestionArray, RuleFix } from "@typescript-eslint/utils/dist/ts-eslint";
import { ImportClause, VariableDeclarator } from "@typescript-eslint/types/dist/generated/ast-spec";
import { ConfigSettings } from "../../configs";
import { createRule } from "../../utils/create-rule";

export const SHOULD_VAR_NAME = "should-var-name";
export const INVALID_VAR_NAME = "invalidVarName";
export const SUGGEST_FUNCTION_VAR_RENAME = "suggestFunctionVarRename";

type MessageIds = typeof INVALID_VAR_NAME | typeof SUGGEST_FUNCTION_VAR_RENAME;

export const shouldVarName = createRule<[], MessageIds>({
  name: SHOULD_VAR_NAME,
  meta: {
    docs: {
      description: "Only allows the configured variable name for Should.js variable name.",
      recommended: "error",
      requiresTypeChecking: false,
    },
    messages: {
      [INVALID_VAR_NAME]: "Invalid variable name for Should.js.",
      [SUGGEST_FUNCTION_VAR_RENAME]: "Rename variable to: {{name}}",
    },
    schema: [],
    hasSuggestions: true,
    type: "suggestion",
  },
  defaultOptions: [],
  create(context) {
    const validVarNames = (context.settings as ConfigSettings).shouldVarNames || ["should"];

    function suggestFixes<T extends VariableDeclarator | ImportClause>(node: T) {
      const suggest: ReportSuggestionArray<MessageIds> = validVarNames.map((name) => ({
        messageId: SUGGEST_FUNCTION_VAR_RENAME,
        data: { name },
        fix(fixer): RuleFix {
          if (node.type === AST_NODE_TYPES.VariableDeclarator) {
            return fixer.replaceText(node.id, name);
          } else {
            return fixer.replaceText(node.local, name);
          }
        },
      }));

      context.report({
        node,
        messageId: INVALID_VAR_NAME,
        suggest,
      });
    }

    return {
      /**
       * Handles checking CommonJs style requires
       *
       * @example
       * const should = require('should');
       */
      CallExpression(node) {
        if (node?.callee?.type !== AST_NODE_TYPES.Identifier) return;

        // If CallExpression isn't requiring Should.js then stop here
        const isRequire = node.callee.name === "require";
        const isOneArg = isRequire && node.arguments.length === 1;
        const packageArg = isOneArg && node.arguments[0];
        const isLiteral = packageArg && packageArg.type === AST_NODE_TYPES.Literal;
        const isShouldPackage = isLiteral && packageArg.value === "should";

        if (!isShouldPackage) return;

        const parent = node.parent;
        if (parent?.type !== AST_NODE_TYPES.VariableDeclarator) return;
        if (parent.id.type !== AST_NODE_TYPES.Identifier) return;

        if (!validVarNames.includes(parent.id.name)) {
          suggestFixes(parent);
        }
      },

      /**
       * Handles checking Module style imports
       *
       * @example
       * import should from 'should';
       */
      ImportDeclaration(node) {
        if (node?.source?.type !== AST_NODE_TYPES.Literal) return;

        // If ImportDeclaration isn't requiring Should.js then stop here
        if (node.source.value !== "should") return;
        const defaultSpecifier = node.specifiers.find(
          (s) => s.type === AST_NODE_TYPES.ImportDefaultSpecifier
        );

        if (defaultSpecifier && !validVarNames.includes(defaultSpecifier.local.name)) {
          suggestFixes(defaultSpecifier);
        }
      },
    };
  },
});
