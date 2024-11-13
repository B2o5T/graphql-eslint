import svelteParser from 'svelte-eslint-parser';
import js from '@eslint/js';
import graphqlPlugin from '@graphql-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.js', '**/*.svelte'],
    processor: graphqlPlugin.processor,
    rules: js.configs.recommended.rules,
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
    },
  },
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    rules: {
      '@graphql-eslint/no-anonymous-operations': 'error',
      '@graphql-eslint/no-duplicate-fields': 'error',
      '@graphql-eslint/naming-convention': [
        'error',
        {
          OperationDefinition: {
            style: 'PascalCase',
            forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
            forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
          },
        },
      ],
    },
  },
];
