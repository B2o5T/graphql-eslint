This project integrates GraphQL and ESLint, for a better developer experience.

<p align="left">
  <img height="150" src="./logo.png">
</p>

[![npm version](https://badge.fury.io/js/%40graphql-eslint%2Feslint-plugin.svg)](https://badge.fury.io/js/%40graphql-eslint%2Feslint-plugin)

> Created and maintained by [The Guild](http://the-guild.dev/)

## Key Features

- 🚀 Integrates with ESLint core (as a ESTree parser).
- 🚀 Works on `.graphql` files, `gql` usages and `/* GraphQL */` magic comments.
- 🚀 Lints both GraphQL schema and GraphQL operations.
- 🚀 Extended type info for more advanced usages
- 🚀 Supports ESLint directives (for example: `disable-next-line`)
- 🚀 Easily extendable - supports custom rules based on GraphQL's AST and ESLint API.
- 🚀 Validates, lints, prettifies and checks for best practices across GraphQL schema and GraphQL operations.
- 🚀 Integrates with [`graphql-config`](https://graphql-config.com/)
- 🚀 Integrates and visualizes lint issues in popular IDEs (VSCode / WebStorm)

> Special thanks to [ilyavolodin](https://github.com/ilyavolodin) for his work on a similar project!

<img src="https://thumbs.gfycat.com/ActualTerrificDog-size_restricted.gif" />

## Getting Started

- [Introducing GraphQL-ESLint!](https://the-guild.dev/blog/introducing-graphql-eslint) @ `the-guild.dev`

### Installation

Start by installing the plugin package, which includes everything you need:

```sh
yarn add -D @graphql-eslint/eslint-plugin
```

Or, with NPM:

```sh
npm install --save-dev @graphql-eslint/eslint-plugin
```

> Also, make sure you have `graphql` dependency in your project.

### Configuration

#### Tell ESLint to apply this plugin to `.graphql` files.

_This step is necessary even if you are declaring operations and/or schema in code files._

To get started, define an override in your ESLint config to tell ESLint to modify the way it treats `.graphql` files. Add the [rules](./docs/README.md) you want applied.

```json
{
  "overrides": [
    {
      "files": ["*.graphql"],
      "parser": "@graphql-eslint/eslint-plugin",
      "plugins": ["@graphql-eslint"],
      "rules": {
        "@graphql-eslint/require-description": [
          "error",
          {
            "on": [
              "ObjectTypeDefinition",
              "InterfaceTypeDefinition",
              "EnumTypeDefinition",
              "InputObjectTypeDefinition",
              "UnionTypeDefinition",
              "FieldDefinition",
              "DirectiveDefinition"
            ]
          }
        ]
      }
    }
  ]
}
```

If your GraphQL definitions are defined only in `.graphql` files and you're only using rules that apply to individual files, you should be good to go 👍 . If you would like use a remote schema or use rules that apply across the entire collection of definitions at once, see [here](#using-rules-with-constraints-that-span-the-entire-schema).

#### Tell ESLint to apply this plugin to GraphQL definitions defined in code files.

If you are defining GraphQL schema or GraphQL operations in code files, you'll want to define an additional override to extend the functionality of this plugin to the schema and operations in those files.

```diff
{
  "overrides": [
+   {
+     "files": ["*.tsx", "*.ts", "*.jsx", "*.js"],
+     "processor": "@graphql-eslint/graphql"
+   },
    {
      "files": ["*.graphql"],
      "parser": "@graphql-eslint/eslint-plugin",
      "plugins": ["@graphql-eslint"],
      "rules": {
        "@graphql-eslint/require-description": [
          "error",
          {
            "on": [
              "ObjectTypeDefinition",
              "InterfaceTypeDefinition",
              "EnumTypeDefinition",
              "InputObjectTypeDefinition",
              "UnionTypeDefinition",
              "FieldDefinition",
              "DirectiveDefinition",
            ],
          },
        ],
      }
    }
  ]
}
```

Under the hood, specifying the `@graphql-eslint/graphql` processor for code files will cause `graphql-eslint/graphql` to extract the schema and operation definitions from these files into virtual GraphQL documents with `.graphql` extensions. This will allow the overrides you've defined for `.graphql` files, via `files: ["*.graphql"]`, to get applied to the definitions defined in your code files.

#### Using a remote schema or rules with constraints that span the entire schema.

Some rules require an understanding of the entire schema at once. For example, [no-unreachable-types](https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/no-unreachable-types.md#no-unreachable-types) checks that all types are reachable by root-level fields.

To use these rules, you'll need to tell ESLint how to identify the entire set of schema definitions.

If you are using [`graphql-config`](https://graphql-config.com/), you are good to go. `graphql-eslint` integrates with it automatically and will use it to load your schema!

Alternatively, you can define `parserOptions.schema` in the `*.graphql` override in your ESLint config.

The parser allows you to specify a json file / graphql files(s) / url / raw string to locate your schema (We are using `graphql-tools` to do that). Just add `parserOptions.schema` to your configuration file:

```diff
{
  "files": ["*.graphql"],
  "parser": "@graphql-eslint/eslint-plugin",
  "plugins": ["@graphql-eslint"],
  "rules": {
    "no-unused-types": ["error"]
  },
+ "parserOptions": {
+   "schema": "./schema.graphql"
+ }
}
```

> You can find a complete [documentation of the `parserOptions` here](./docs/parser-options.md)

> Some rules requires type information to operate, it's marked in the docs for each rule!

#### Extended linting rules with siblings operations

While implementing this tool, we had to find solutions for a better integration of the GraphQL ecosystem and ESLint core.

GraphQL operations can be distributed across many files, while ESLint operates on one file at a time. If you are using GraphQL fragments in separate files, some rules might yield incorrect results, due the the missing information.

To workaround that, we allow you to provide additional information on your GraphQL operations, making it available for rules while doing the actual linting.

To provide that, we are using `@graphql-tools` loaders to load your sibling operations and fragments, just specify a glob expression(s) that points to your code/.graphql files:

```diff
{
  "files": ["*.graphql"],
  "parser": "@graphql-eslint/eslint-plugin",
  "plugins": ["@graphql-eslint"],
  "rules": {
    "unique-operation-name": ["error"]
  },
  "parserOptions": {
+   "operations": ["./src/**/*.graphql"],
    "schema": "./schema.graphql"
  }
}
```

### VSCode Integration

By default, [ESLint VSCode plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) will not lint files with extensions other then js, jsx, ts, tsx.

In order to enable it processing other extensions, add the following section in `settings.json` or workspace configuration.

```json
{
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "graphql"]
}
```

Currently, you also need a GraphQL IDE extension for syntax highlighting installed (which may potentially have its own linting) - for example [GraphQL (by GraphQL Foundation)](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

### Disabling Rules

The `graphql-eslint` parser looks for GraphQL comments syntax (marked with `#`) and will send it to ESLint as directives. That means, you can use ESLint directives syntax to hint ESLint, just like in any other type of files.

To disable ESLint for a specific line, you can do:

```graphql
# eslint-disable-next-line
type Query {
  foo: String!
}
```

You can also specify specific rules to disable, apply it over the entire file, `next-line` or (current) `line`.

You can find a list of [ESLint directives here](https://eslint.org/docs/2.13.1/user-guide/configuring#disabling-rules-with-inline-comments).

## Available Rules

You can find a complete list of [all available rules here](./docs/README.md)

## Available Configs

This plugin exports a [`recommended` config](packages/plugin/src/configs/recommended.ts) that enforces good practices and an [`all` config](packages/plugin/src/configs/all.ts) that makes use of all rules (except for deprecated ones).

Enable it in your `.eslintrc` file with the `extends` option.

> These configs under the hood set `parser` as `@graphql-eslint/eslint-plugin` and add `@graphql-eslint` to `plugins` array, so you don't need to specify them.

```diff
{
  "overrides": [
    {
      "files": ["*.js"],
      "processor": "@graphql-eslint/graphql",
      "rules": {
        // your rules for JavaScript files
      }
    },
    {
      "files": ["*.graphql"],
-     "parser": "@graphql-eslint/eslint-plugin",
-     "plugins": ["@graphql-eslint"],
+     "extends": "plugin:@graphql-eslint/recommended", // or plugin:@graphql-eslint/all
      "rules": {
        // your rules for GraphQL files
      }
    }
  ]
}
```

### `prettier` rule

The original `prettier` rule has been removed because `eslint-plugin-prettier` supports `.graphql` files well actually.

All you need to do is like the following for now:

```js
// .eslintrc.js
module.exports = {
  overrides: [
    {
      files: ['*.js'],
      processor: '@graphql-eslint/graphql',
      extends: ['plugin:prettier/recommended']
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        'prettier/prettier': 'error'
      }
    },
    // the following is required for `eslint-plugin-prettier@<=3.4.0` temporarily
    // after https://github.com/prettier/eslint-plugin-prettier/pull/415
    // been merged and released, it can be deleted safely
    {
      files: ['*.js/*.graphql'],
      rules: {
        'prettier/prettier': 'off'
      }
    }
  ]
}
```

You can take [`examples/prettier`](examples/prettier/.eslintrc.js) as example.

It could be better to remove the unnecessary `*.js/*.graphql` overrides setting if <https://github.com/prettier/eslint-plugin-prettier/pull/415> will be merged and released.

Please help to vote up if you want to speed up the progress.

## Further Reading

If you wish to learn more about this project, how the parser works, how to add custom rules and more, [please refer to the docs directory](./docs/README.md))

## Contributions

Contributions, issues and feature requests are very welcome. If you are using this package and fixed a bug for yourself, please consider submitting a PR!

And if this is your first time contributing to this project, please do read our [Contributor Workflow Guide](https://github.com/the-guild-org/Stack/blob/master/CONTRIBUTING.md) before you get started off.

### Code of Conduct

Help us keep GraphQL ESLint open and inclusive. Please read and follow our [Code of Conduct](https://github.com/the-guild-org/Stack/blob/master/CODE_OF_CONDUCT.md) as adopted from [Contributor Covenant](https://www.contributor-covenant.org/)

## License

Released under the [MIT license](./LICENSE).
