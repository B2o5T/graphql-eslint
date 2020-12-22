import { GraphQLRuleTester } from '../src/testkit';
import { ParserOptions } from '../src/types';
import rule from '../src/rules/no-unreachable-types';

const ruleTester = new GraphQLRuleTester();

function useSchema(
  schema: string
): {
  code: string;
  parserOptions: ParserOptions;
} {
  return {
    parserOptions: {
      schema,
    },
    code: schema,
  };
}

ruleTester.runGraphQLTests('no-unreachable-types', rule, {
  valid: [
    useSchema(/* GraphQL */ `
      type Query {
        me: User
      }

      type User {
        id: ID
        name: String
      }
    `),
  ],
  invalid: [
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          me: String
        }

        type User {
          id: ID
          name: String
        }
      `),
      errors: [
        {
          message: `Type "User" in unreachable`,
        },
      ],
    },
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          users: [User]
        }

        type User {
          id: ID
          name: String
        }

        input UsersFilter {
          limit: Int
        }
      `),
      errors: [
        {
          message: `Type "UsersFilter" in unreachable`,
        },
      ],
    },
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          me: User
        }

        type User {
          id: ID
          name: String
        }

        type Articles {
          id: ID
          title: String
          author: User
        }
      `),
      errors: [
        {
          message: `Type "Articles" in unreachable`,
        },
      ],
    },
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          me: User
        }

        type User {
          id: ID
          name: String
          articles: [Article]
        }

        type Article {
          id: ID
          title: String
          author: User
        }

        type Comment {
          id: ID
          article: Article
        }
      `),
      errors: [
        {
          message: `Type "Comment" in unreachable`,
        },
      ],
    },
  ],
});
