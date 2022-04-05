# eslint-plugin-shouldjs

Rules that apply to testing with the [should-js](https://shouldjs.github.io/) library.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@jaredmcateer/eslint-plugin-shouldjs`:

```sh
npm install @jaredmcateer/eslint-plugin-shouldjs --save-dev
```

## Usage

Add `@jaredmcateer/shouldjs` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["@jaredmcateer/shouldjs"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "shouldjs/no-property-assertions": "error"
  }
}
```

Alternative you can use the recommended settings

```json
{
  "extends": [
    "@jaredmcateer/shouldjs:recommended"
  ]
}
```

## Supported Rules

[no-property-assertion](lib/rules/no-property-assertions/no-property-assertion.md)

