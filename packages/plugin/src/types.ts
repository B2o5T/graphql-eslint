import { Rule, AST, Linter } from 'eslint';
import * as ESTree from 'estree';
import { GraphQLSchema } from 'graphql';
import { IExtensions, IGraphQLProject } from 'graphql-config';
import { GraphQLParseOptions } from '@graphql-tools/utils';
import { GraphQLESLintRuleListener } from './testkit';
import { SiblingOperations } from './documents';
import { JSONSchema } from 'json-schema-to-ts';

export type Schema = GraphQLSchema | Error | null;
export type Pointer = string | string[];

export interface ParserOptions {
  schema?: Pointer | Record<string, { headers: Record<string, string> }>;
  documents?: Pointer;
  operations?: Pointer; // legacy
  extensions?: IExtensions;
  include?: Pointer;
  exclude?: Pointer;
  projects?: Record<string, IGraphQLProject>;
  schemaOptions?: Omit<GraphQLParseOptions, 'assumeValidSDL'> & {
    headers: Record<string, string>;
  };
  graphQLParserOptions?: Omit<GraphQLParseOptions, 'noLocation'>;
  skipGraphQLConfig?: boolean;
  filePath: string;
}

export type ParserServices = {
  schema: Schema;
  siblingOperations: SiblingOperations;
};

export type GraphQLESLintParseResult = Linter.ESLintParseResult & {
  services: ParserServices;
};

type Location = AST.SourceLocation | ESTree.Position;

type ReportDescriptorLocation = { node: { loc: Location } } | { loc: Location };
export type ReportDescriptor = Rule.ReportDescriptorMessage &
  Rule.ReportDescriptorOptions &
  ReportDescriptorLocation;

export type GraphQLESLintRuleContext<Options = any[]> = Omit<
  Rule.RuleContext,
  'parserServices' | 'report' | 'options'
> & {
  options: Options;
  report(descriptor: ReportDescriptor): void;
  parserServices?: ParserServices;
};

export type CategoryType = 'Schema' | 'Operations';

export type RuleDocsInfo<T> = Omit<Rule.RuleMetaData['docs'], 'category' | 'suggestion'> & {
  category: CategoryType | CategoryType[];
  requiresSchema?: true;
  requiresSiblings?: true;
  examples?: {
    title: string;
    code: string;
    usage?: T;
  }[];
  configOptions?:
    | T
    | {
        schema?: T;
        operations?: T;
      };
  graphQLJSRuleName?: string;
  isDisabledForAllConfig?: true;
};

export type GraphQLESLintRule<Options = any[], WithTypeInfo extends boolean = false> = {
  create(context: GraphQLESLintRuleContext<Options>): GraphQLESLintRuleListener<WithTypeInfo>;
  meta: Omit<Rule.RuleMetaData, 'docs' | 'schema'> & {
    docs?: RuleDocsInfo<Options>;
  };
};

export type ValueOf<T> = T[keyof T];

// eslint-disable-next-line @typescript-eslint/ban-types -- Cosmetic use only, makes the tooltips expand the type can be removed
type Id<T> = {} & { [P in keyof T]: T[P] };
// eslint-disable-next-line no-use-before-define
type OmitDistributive<T, K extends PropertyKey> = T extends object ? Id<OmitRecursively<T, K>> : T;
export type OmitRecursively<T extends object, K extends PropertyKey> = Omit<
  { [P in keyof T]: OmitDistributive<T[P], K> },
  K
>;
