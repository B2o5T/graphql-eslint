import { GraphQLRuleTester, ParserOptions } from '../src';
import rule from '../src/rules/no-unreachable-types';

const useSchema = (schema: string): { code: string; parserOptions: ParserOptions } => {
  return {
    parserOptions: { schema },
    code: schema,
  };
};

new GraphQLRuleTester().runGraphQLTests('no-unreachable-types', rule, {
  valid: [
    useSchema(/* GraphQL */ `
      scalar A
      scalar B

      # UnionTypeDefinition
      union Response = A | B

      type Query {
        foo: Response
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        me: User
      }

      # ObjectTypeDefinition
      type User {
        id: ID
        name: String
      }
    `),
    useSchema(/* GraphQL */ `
      type Query {
        me: User
      }

      # InterfaceTypeDefinition
      interface Address {
        city: String
      }

      type User implements Address {
        city: String
      }
    `),
    useSchema(/* GraphQL */ `
      # ScalarTypeDefinition
      scalar DateTime

      type Query {
        now: DateTime
      }
    `),
    useSchema(/* GraphQL */ `
      # EnumTypeDefinition
      enum Role {
        ADMIN
        USER
      }

      type Query {
        role: Role
      }
    `),
    useSchema(/* GraphQL */ `
      input UserInput {
        id: ID
      }

      type Query {
        # InputValueDefinition
        user(input: UserInput!): Boolean
      }
    `),
    useSchema(/* GraphQL */ `
      # DirectiveDefinition
      directive @auth(role: [String]!) on FIELD_DEFINITION

      type Query {
        # Directive
        user: ID @auth(role: [ADMIN])
      }
    `),
    useSchema(/* GraphQL */ `
      type RootQuery
      type RootMutation
      type RootSubscription

      schema {
        query: RootQuery
        mutation: RootMutation
        subscription: RootSubscription
      }
    `),
  ],
  invalid: [
    {
      ...useSchema(/* GraphQL */ `
        # ScalarTypeDefinition
        scalar DateTime

        # EnumTypeDefinition
        enum Role {
          ADMIN
          USER
        }

        # DirectiveDefinition
        directive @auth(role: [String!]!) on FIELD_DEFINITION

        # UnionTypeDefinition
        union Union = String | Boolean

        type Query
      `),
      output: /* GraphQL */ `
        # normalize graphql
        type Query
      `,
      errors: [
        { message: 'Type "DateTime" is unreachable' },
        { message: 'Type "Role" is unreachable' },
        { message: 'Type "auth" is unreachable' },
        { message: 'Type "Union" is unreachable' },
      ],
    },
    {
      ...useSchema(/* GraphQL */ `
        # InterfaceTypeDefinition
        interface Address {
          city: String
        }

        type User implements Address {
          city: String
        }
      `),
      output: /* GraphQL */ `
        # normalize graphql
        interface Address {
          city: String
        }
      `,
      errors: [{ message: 'Type "User" is unreachable' }],
    },
    {
      ...useSchema(/* GraphQL */ `
        interface User {
          id: String
        }

        type SuperUser implements User {
          id: String
          superDetail: SuperDetail
        }

        type SuperDetail {
          detail: String
        }

        type Query {
          user: User!
        }
      `),
      output: /* GraphQL */ `
        # normalize graphql
        interface User {
          id: String
        }

        type SuperDetail {
          detail: String
        }

        type Query {
          user: User!
        }
      `,
      errors: [{ message: 'Type "SuperUser" is unreachable' }],
    },
    {
      ...useSchema(/* GraphQL */ `
        interface User {
          id: String
        }

        type SuperUser implements User {
          id: String
        }

        # ObjectTypeExtension
        extend type SuperUser {
          detail: String
        }

        type Query {
          user: User!
        }
      `),
      output: /* GraphQL */ `
        # normalize graphql
        interface User {
          id: String
        }

        type Query {
          user: User!
        }
      `,
      errors: [{ message: `Type "SuperUser" is unreachable` }, { message: `Type "SuperUser" is unreachable` }],
    },
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          node(id: ID!): Node!
        }

        interface Node {
          id: ID!
        }

        interface User implements Node {
          id: ID!
          name: String
        }

        type SuperUser implements User & Node {
          id: ID!
          name: String
          address: String
        }
      `),
      output: /* GraphQL */ `
        # normalize graphql
        type Query {
          node(id: ID!): Node!
        }

        interface Node {
          id: ID!
        }

        interface User implements Node {
          id: ID!
          name: String
        }
      `,
      errors: [{ message: `Type "SuperUser" is unreachable` }],
    },
    {
      ...useSchema(/* GraphQL */ `
        type Query {
          me: User!
        }

        interface User {
          name: String
        }

        type SuperUser implements User {
          address: String
        }

        # InputObjectTypeDefinition
        input UsersFilter {
          limit: Int
        }
      `),
      output: /* GraphQL */ `
        # normalize graphql
        type Query {
          me: User!
        }

        interface User {
          name: String
        }
      `,
      errors: [{ message: `Type "SuperUser" is unreachable` }, { message: `Type "UsersFilter" is unreachable` }],
    },
  ],
});
