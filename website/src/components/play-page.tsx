import { ReactElement, useRef } from 'react';
import { flatConfigs, rules } from '@graphql-eslint/eslint-plugin';
import graphqlESLintPkgJson from '@graphql-eslint/eslint-plugin/package.json';
import { asArray } from '@graphql-tools/utils';
import { clsx } from 'clsx';
import eslintPkgJson from 'eslint/package.json';
import debounce from 'lodash.debounce';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { GraphQLEditor } from './graphql-editor';
import { Select } from './select';
import { Button } from './button';
import { Select2, SelectOption } from './select2';

const schemaConfigs = ['schema-recommended', 'schema-all', 'relay'];
const operationsConfigs = ['operations-recommended', 'operations-all'];

const schemaRulesOptions = Object.entries(rules)
  .filter(([, rule]) => asArray(rule.meta.docs!.category).includes('Schema'))
  .map(([ruleId]) => ({ key: ruleId, name: ruleId }));
const operationsRulesOptions = Object.entries(rules)
  .filter(([, rule]) => asArray(rule.meta.docs!.category).includes('Schema'))
  .map(([ruleId]) => ({ key: ruleId, name: ruleId }));

const schemaConfigsOptions = schemaConfigs.map(name => ({ key: name, name }));
const operationsConfigsOptions = operationsConfigs.map(name => ({ key: name, name }));

function dedent(code: string) {
  return code
    .split('\n')
    .map(line => line.slice(2))
    .join('\n')
    .trimStart();
}

const DEFAULT_SCHEMA = dedent(/* GraphQL*/ `
  scalar DateTime

  type Post {
    id: ID!
    title: String
    createdAt: DateTime
    modifiedAt: DateTime
  }

  type Query {
    post: Post!
    posts: [Post!]
  }
`);

const DEFAULT_OPERATION = dedent(/* GraphQL */ `
  query {
    posts {
      id
      title
    }
  }
`);

function useDebouncedQueryParams<TypeToEncode, TypeFromDecode = TypeToEncode>(
  ...args: Parameters<typeof useQueryParam<TypeToEncode, TypeFromDecode>>
): ReturnType<typeof useQueryParam<TypeToEncode, TypeFromDecode>> {
  const [query, setQuery] = useQueryParam(...args);
  const fn = useRef<typeof setQuery>();
  fn.current ||= debounce(setQuery, 500);

  return [query, fn.current];
}

const classes = {
  heading: clsx('font-medium mb-2'),
};

export function PlayPage(): ReactElement {
  const [schemaConfig, setSchemaConfig] = useDebouncedQueryParams(
    'schemaConfig',
    withDefault(StringParam, ''),
  );
  const [operationConfig, setOperationConfig] = useDebouncedQueryParams(
    'operationConfig',
    withDefault(StringParam, ''),
  );
  const [schemaRule, setSchemaRule] = useDebouncedQueryParams(
    'schemaRule',
    withDefault(StringParam, ''),
  );
  const [operationRule, setOperationRule] = useDebouncedQueryParams(
    'operationRule',
    withDefault(StringParam, ''),
  );
  const [schema, setSchema] = useDebouncedQueryParams(
    'schema',
    withDefault(StringParam, DEFAULT_SCHEMA),
  );
  const [operation, setOperation] = useDebouncedQueryParams(
    'operation',
    withDefault(StringParam, DEFAULT_OPERATION),
  );

  const selectedSchemaRule: SelectOption = schemaRule
    ? { key: schemaRule, name: schemaRule }
    : { key: '', name: 'Choose a schema rule' };
  const selectedSchemaConfig: SelectOption = schemaConfig
    ? { key: schemaConfig, name: schemaConfig }
    : { key: '', name: 'Choose a schema config' };
  const selectedOperationRule: SelectOption = operationRule
    ? { key: operationRule, name: operationRule }
    : { key: '', name: 'Choose an operation rule' };
  const selectedOperationConfig: SelectOption = operationConfig
    ? { key: operationConfig, name: operationConfig }
    : { key: '', name: 'Choose an operation config' };

  return (
    <div className="flex h-[calc(100vh-var(--nextra-navbar-height)-68px)] flex-col md:flex-row">
      <div className="nextra-scrollbar flex w-[300px] flex-col gap-4 overflow-y-auto p-6 text-xs">
        <div>
          <h3 className={classes.heading}>VERSIONING</h3>
          <span className="flex justify-between text-sm">
            <span>ESLint</span>
            <span>{eslintPkgJson.version}</span>
          </span>
          <span className="flex justify-between text-sm">
            <span>GraphQL-ESLint</span>
            <span>{graphqlESLintPkgJson.version}</span>
          </span>
        </div>
        <div>
          <h3 className={classes.heading}>SCHEMA RULES</h3>
          <Select2
            options={schemaRulesOptions}
            selected={selectedSchemaRule}
            onChange={({ key }) => setSchemaRule(key)}
          />
        </div>
        <div>
          <h3 className={classes.heading}>SCHEMA CONFIG</h3>
          <Select2
            options={schemaConfigsOptions}
            selected={selectedSchemaConfig}
            onChange={({ key }) => setSchemaConfig(key)}
          />
        </div>
        <div>
          <h3 className={classes.heading}>OPERATION RULES</h3>
          <Select2
            options={operationsRulesOptions}
            selected={selectedOperationRule}
            onChange={({ key }) => setOperationRule(key)}
          />
        </div>
        <div>
          <h3 className={classes.heading}>OPERATION CONFIG</h3>
          <Select2
            options={operationsConfigsOptions}
            selected={selectedOperationConfig}
            onChange={({ key }) => setOperationConfig(key)}
          />
        </div>

        <Button className="mt-6">Download this config</Button>

        <Select />
      </div>
      <GraphQLEditor
        height="calc(50% - 17px)"
        code={schema}
        fileName="schema.graphql"
        schema={schema}
        documents={operation}
        selectedRules={{
          ...(selectedSchemaConfig.key && flatConfigs[selectedSchemaConfig.key].rules),
          ...(selectedSchemaRule.key && flatConfigs['schema-all'].rules[selectedSchemaRule.key]),
        }}
        onChange={setSchema}
      />
      <GraphQLEditor
        height="calc(50% - 17px)"
        code={operation}
        fileName="operation.graphql"
        schema={schema}
        documents={operation}
        selectedRules={{
          ...(selectedOperationConfig.key && flatConfigs[selectedOperationConfig.key].rules),
          ...(selectedOperationRule.key &&
            flatConfigs['operations-all'].rules[selectedOperationRule.key]),
        }}
        onChange={setOperation}
      />
    </div>
  );
}
