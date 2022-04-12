# should-var-name

The `"extends": "@jaredmcateer/shouldjs:recommended"` property in a configuration file enables this rule.

Disallows assigning a variable for Should.js that isn't part of the approved list. This is set by the `shouldVarNames` array in settings property of the eslint config.

## Rule Details

Given an eslint configurations

```js
{
  settings: {
    shouldVarNames: ["should"];
  }
}
```

Examples of **incorrect** code for this rule:

```js
const expect = require("should");
import expect from "should";
```

Examples of **correct** code for this rule:

```js
const should = require("should");
import should from "should";
```

## When Not To Use It

It is not recommended to turn this rule off. Other rules in the plugin rely on the variable name when using the Should.js function to decide whether to lint by assigning it an unknown value those rules will not be run.
