import { rule } from './index.js';
import { ruleTester, withSchema } from '../../../__tests__/test-utils.js';

ruleTester.run('require-nullable-result-in-root', rule, {
  valid: [
    withSchema({
      code: /* GraphQL */ `
        type Query {
          foo: User
          baz: [User]!
          bar: [User!]!
        }
        type User {
          id: ID!
        }
      `,
    }),
  ],
  invalid: [
    withSchema({
      code: /* GraphQL */ `
        type Query {
          user: User!
        }
        type User {
          id: ID!
        }
      `,
      errors: 1,
    }),
    withSchema({
      name: 'should work with extend query',
      code: /* GraphQL */ `
        type MyMutation
        extend type MyMutation {
          user: User!
        }
        interface User {
          id: ID!
        }
        schema {
          mutation: MyMutation
        }
      `,
      errors: 1,
    }),
    withSchema({
      name: 'should work with default scalars',
      code: 'type Mutation { foo: Boolean! }',
      errors: 1,
    }),
  ],
});
