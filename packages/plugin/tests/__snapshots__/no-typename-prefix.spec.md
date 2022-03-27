// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Invalid #1 1`] = `
#### ⌨️ Code

      1 |         type User {
      2 |           userId: ID!
      3 |         }

#### ❌ Error

      1 |         type User {
    > 2 |           userId: ID!
        |           ^^^^^^ Field "userId" starts with the name of the parent type "User"
      3 |         }

#### 💡 Suggestion: Remove \`user\` prefix

    1 |         type User {
    2 |           Id: ID!
    3 |         }
`;

exports[`Invalid #2 1`] = `
#### ⌨️ Code

      1 |         type User {
      2 |           userId: ID!
      3 |           userName: String!
      4 |         }

#### ❌ Error 1/2

      1 |         type User {
    > 2 |           userId: ID!
        |           ^^^^^^ Field "userId" starts with the name of the parent type "User"
      3 |           userName: String!

#### 💡 Suggestion: Remove \`user\` prefix

    1 |         type User {
    2 |           Id: ID!
    3 |           userName: String!
    4 |         }

#### ❌ Error 2/2

      2 |           userId: ID!
    > 3 |           userName: String!
        |           ^^^^^^^^ Field "userName" starts with the name of the parent type "User"
      4 |         }

#### 💡 Suggestion: Remove \`user\` prefix

    1 |         type User {
    2 |           userId: ID!
    3 |           Name: String!
    4 |         }
`;

exports[`Invalid #3 1`] = `
#### ⌨️ Code

      1 |         interface Node {
      2 |           nodeId: ID!
      3 |         }

#### ❌ Error

      1 |         interface Node {
    > 2 |           nodeId: ID!
        |           ^^^^^^ Field "nodeId" starts with the name of the parent type "Node"
      3 |         }

#### 💡 Suggestion: Remove \`node\` prefix

    1 |         interface Node {
    2 |           Id: ID!
    3 |         }
`;
