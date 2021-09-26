const SCHEMA = /* GraphQL */ `
  type User {
    id: ID!
    firstName: String!
    posts(limit: Int = 25, offset: Int = 0): [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
  }

  type Query {
    user: User
    post: Post
  }
`;
