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

## Configuration

### Settings

By default the only allowed variable name for should is `should`, this can be changed by providing an array to `shouldVarNames` in the eslint settings.

```json
{
  "settings": {
    "shouldVarNames": ["should", "expect"]
  }
}
```

### Rules

Add the rules you want to use under the rules section.

```json
{
  "rules": {
    "@jaredmcateer/shouldjs/should-var-name": "error",
    "@jaredmcateer/shouldjs/no-property-assertions": "error"
  }
}
```

Alternative you can use the recommended settings

```json
{
  "extends": ["@jaredmcateer/shouldjs:recommended"]
}
```

## Supported Rules

- [should-var-names](lib/rules/should-var-name/should-var-name.md)
- [no-property-assertion](lib/rules/no-property-assertions/no-property-assertion.md)

## Acknowledgements

Much of the configuration and learnings of building ESLint Plugins was lifted directly from Darragh ORiordan's article on [How to Write an ESLint Plugin in TypeScript](https://www.darraghoriordan.com/2021/11/06/how-to-write-an-eslint-plugin-typescript/) and [repository](https://github.com/darraghoriordan/eslint-plugin-nestjs-typed). Huge thanks.
