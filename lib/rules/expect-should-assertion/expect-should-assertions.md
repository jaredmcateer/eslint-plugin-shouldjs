# expect-should-assertion

The `"extends": "@jaredmcateer/shouldjs:recommended"` property in a configuration file enables this rule.

Disallows should function variable to be called without chaining an assertion.

Should.js does not assert solely by calling the function variable.

You can configure the `shouldVarNames` in the `settings` property of the eslint config to limit which variable names will be checked.

## Rule Details

Examples of **incorrect** code for this rule:

```js
should(foo);
```

Examples of **correct** code for this rule:

```js
should(foo).be.truthy();
```

## When Not To Use It

It is not recommended to turn this rule off.
