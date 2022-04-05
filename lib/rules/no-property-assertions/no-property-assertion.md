# no-property-assertion

The `"extends": "@jaredmcateer/shouldjs:recommended"` property in a configuration file enables this rule.

Disallows ending a should-js chain with a property instead of a method.

Should-js does not use properties for assertions but it is a common gotcha with certain assertions.

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

### Options

This rule accepts a `name` option, which can be used to specify the variable name(s) given to the variable name when using it in function form:

```js
{
  "rules": {
    "@jaredmcateer/shouldjs/no-property-assertion": ["error", {"name": ["should", "expect"]}]
  }
}
```

## When Not To Use It

It is not recommended to turn this rule off.
