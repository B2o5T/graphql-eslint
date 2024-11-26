/**
 * Legacy config example, should be run with `ESLINT_USE_FLAT_CONFIG=false` environment variable in ESLint 9
 */

module.exports = {
  root: true,
  // ❗️ It's very important that you don't have any rules configured at the top-level config,
  // and to move all configurations into the overrides section. Since JavaScript rules
  // can't run on GraphQL files and vice versa, if you have rules configured at the top level,
  // they will try to also execute for all overrides, as ESLint's configs cascade
  overrides: [
    {
      files: '*.{js,tsx}',
      extends: 'eslint:recommended',
      env: {
        es2022: true,
      },
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      files: 'client/**/*.tsx',
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      // Setup GraphQL Parser
      files: '*.{graphql,gql}',
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
    },
    {
      // Setup processor for operations/fragments definitions on code-files
      files: 'client/**/*.tsx',
      processor: '@graphql-eslint/graphql',
    },
    {
      // Setup recommended config for schema files
      files: 'server/**/*.gql',
      extends: 'plugin:@graphql-eslint/schema-recommended',
      rules: {
        // Override graphql-eslint rules for schema files
      },
    },
    {
      // Setup recommended config for operations files
      files: 'client/**/*.{graphql,gql}',
      extends: 'plugin:@graphql-eslint/operations-recommended',
      rules: {
        // Override graphql-eslint rules for operations files
      },
    },
  ],
};
