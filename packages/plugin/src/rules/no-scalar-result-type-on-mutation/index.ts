import { isScalarType, Kind, NameNode } from 'graphql';
import { GraphQLESTreeNode } from '../../estree-converter/index.js';
import { GraphQLESLintRule } from '../../types.js';
import { getNodeName, requireGraphQLSchema } from '../../utils.js';

const RULE_ID = 'no-scalar-result-type-on-mutation';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'schema',
      description:
        'Avoid scalar result type on mutation type to make sure to return a valid state.',
      url: `https://the-guild.dev/graphql/eslint/rules/${RULE_ID}`,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type Mutation {
              createUser: Boolean
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type Mutation {
              createUser: User!
            }
          `,
        },
      ],
    },
    schema: [],
  },
  create(context) {
    const schema = requireGraphQLSchema(RULE_ID, context);
    const mutationType = schema.getMutationType();
    if (!mutationType) {
      return {};
    }
    const selector = [
      `:matches(ObjectTypeDefinition, ObjectTypeExtension)[name.value=${mutationType.name}]`,
      '> FieldDefinition > .gqlType Name',
    ].join(' ');

    return {
      [selector](node: GraphQLESTreeNode<NameNode>) {
        const typeName = node.value;
        const graphQLType = schema.getType(typeName);
        if (isScalarType(graphQLType)) {
          let fieldDef = node.parent as any;
          while (fieldDef.kind !== Kind.FIELD_DEFINITION) {
            fieldDef = fieldDef.parent;
          }

          context.report({
            node,
            message: `Unexpected scalar result type \`${typeName}\` for ${getNodeName(fieldDef)}`,
            suggest: [
              {
                desc: `Remove \`${typeName}\``,
                // @ts-expect-error -- fixme
                fix: fixer => fixer.remove(node),
              },
            ],
          });
        }
      },
    };
  },
};
