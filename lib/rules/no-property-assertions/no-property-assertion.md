# no-property-assertion

The `"extends": "@jaredmcateer/shouldjs:recommended"` property in a configuration file enables this rule.

Disallows ending a should-js chain with a property instead of a method.

Should-js does not use properties for assertions but it is a common gotcha with certain assertions.

When checking by the CallExpression you can configure the `shouldVarNames` in the `settings` property of the eslint config to limit which variable names will be checked.

## Rule Details

Examples of **incorrect** code for this rule:

```js
foo.should.be.true;
should(foo).be.a.String;
```

Examples of **correct** code for this rule:

```js
foo.should.be.true();
should(foo).be.a.String();
```

## When Not To Use It

It is not recommended to turn this rule off.
