import { FragmentSpreadNode } from 'graphql';
import { GraphQLESTreeNode } from '../estree-converter/index.js';
import { GraphQLESLintRule } from '../types.js';

const RULE_ID = 'require-import-fragment';
const SUGGESTION_ID = 'add-import-expression';

export const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Operations',
      description: 'Require fragments to be imported via an import expression.',
      url: `https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query MyQuery {
              fooField {
                ...Foo
              }
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            # import Bar from 'bar.graphql'
            # import 'foo.graphql'

            query MyQuery {
              fooField {
                ...Foo
              }
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            # import Foo from 'foo.graphql'

            query MyQuery {
              fooField {
                ...Foo
              }
            }
          `,
        },
      ],
    },
    hasSuggestions: true,
    messages: {
      [RULE_ID]: "Expected '{{name}}' fragment to be imported.",
      [SUGGESTION_ID]: "Add import expression for '{{name}}'",
    },
    schema: [],
  },
  create(context) {
    const knownFragmentNames = new Set<string>();
    const fragmentSpreadNodes = new Set<GraphQLESTreeNode<FragmentSpreadNode>>();
    const comments = context.getSourceCode().getAllComments();

    function checkFragmentSpreadNode(fragmentSpreadNode: GraphQLESTreeNode<FragmentSpreadNode>) {
      const fragmentName = fragmentSpreadNode.name.value;

      if (knownFragmentNames.has(fragmentName)) {
        return;
      }

      for (const comment of comments) {
        if (
          comment.type === 'Line' &&
          comment.value.trim().startsWith(`import ${fragmentName} from `)
        ) {
          return;
        }
      }

      context.report({
        node: fragmentSpreadNode.name,
        messageId: RULE_ID,
        data: {
          name: fragmentName,
        },
        suggest: [
          {
            messageId: SUGGESTION_ID,
            data: { name: fragmentName },
            fix(fixer) {
              return fixer.insertTextBeforeRange(
                [0, 0],
                `# import ${fragmentName} from 'PLEASE_CHANGE.graphql'\n`,
              );
            },
          },
        ],
      });
    }

    return {
      FragmentSpread(fragmentSpreadNode) {
        fragmentSpreadNodes.add(fragmentSpreadNode);
      },
      FragmentDefinition(fragmentDefinitionNode) {
        knownFragmentNames.add(fragmentDefinitionNode.name.value);
      },
      'Document:exit'() {
        for (const fragmentSpreadNode of fragmentSpreadNodes) {
          checkFragmentSpreadNode(fragmentSpreadNode);
        }
      },
    };
  },
};
