// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`require-selections > invalid > Invalid #1 1`] = `
#### ⌨️ Code

      1 | { hasId { name } }

#### ❌ Error

    > 1 | { hasId { name } }
        |         ^ Field \`hasId.id\` must be selected when it's available on a type.
    Include it in your selection set.

#### 💡 Suggestion: Add \`id\` selection

    1 | { hasId { id name } }
`;

exports[`require-selections > invalid > Invalid #2 1`] = `
#### ⌨️ Code

      1 | { hasId { id } }

#### ⚙️ Options

    {
      "fieldName": "name"
    }

#### ❌ Error

    > 1 | { hasId { id } }
        |         ^ Field \`hasId.name\` must be selected when it's available on a type.
    Include it in your selection set.

#### 💡 Suggestion: Add \`name\` selection

    1 | { hasId { name id } }
`;

exports[`require-selections > invalid > should not ignore FragmentDefinition 1`] = `
#### ⌨️ Code

      1 |         fragment UserFields on User {
      2 |           name
      3 |           posts {
      4 |             title
      5 |           }
      6 |         }

#### ❌ Error 1/2

    > 1 |         fragment UserFields on User {
        |                                     ^ Field \`UserFields.id\` must be selected when it's available on a type.
    Include it in your selection set.
      2 |           name

#### 💡 Suggestion: Add \`id\` selection

    1 |         fragment UserFields on User {
    2 |           id name
    3 |           posts {
    4 |             title
    5 |           }
    6 |         }

#### ❌ Error 2/2

      2 |           name
    > 3 |           posts {
        |                 ^ Field \`posts.id\` must be selected when it's available on a type.
    Include it in your selection set.
      4 |             title

#### 💡 Suggestion: Add \`id\` selection

    1 |         fragment UserFields on User {
    2 |           name
    3 |           posts {
    4 |             id title
    5 |           }
    6 |         }
`;

exports[`require-selections > invalid > should not work with n nested fragments if you never get the id 1`] = `
#### ⌨️ Code

      1 |         query User {
      2 |           user {
      3 |             ...UserFullFields
      4 |           }
      5 |         }

#### ❌ Error

      1 |         query User {
    > 2 |           user {
        |                ^ Field \`user.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragments \`UserFullFields\`, \`UserMediumFields\`, or \`UserLightFields\`.
      3 |             ...UserFullFields

#### 💡 Suggestion: Add \`id\` selection

    1 |         query User {
    2 |           user {
    3 |             id ...UserFullFields
    4 |           }
    5 |         }
`;

exports[`require-selections > invalid > should report an error about missing \`posts.id\` field in fragment 1`] = `
#### ⌨️ Code

      1 | { user { id ...UserFields } }

#### ❌ Error

    > 1 | { user { id ...UserFields } }
        |             ^ Field \`posts.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragment \`UserFields\`.
`;

exports[`require-selections > invalid > should report an error about missing \`user.id\`, \`posts.id\`, \`author.id\` and \`authorPosts.id\` selection 1`] = `
#### ⌨️ Code

      1 | { user { ...UserFullFields } }

#### ❌ Error 1/4

    > 1 | { user { ...UserFullFields } }
        |        ^ Field \`user.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragment \`UserFullFields\`.

#### 💡 Suggestion: Add \`id\` selection

    1 | { user { id ...UserFullFields } }

#### ❌ Error 2/4

    > 1 | { user { ...UserFullFields } }
        |          ^ Field \`posts.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragment \`UserFullFields\`.

#### ❌ Error 3/4

    > 1 | { user { ...UserFullFields } }
        |          ^ Field \`author.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragments \`UserFullFields\` or \`UserFields\`.

#### ❌ Error 4/4

    > 1 | { user { ...UserFullFields } }
        |          ^ Field \`authorPosts.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragments \`UserFullFields\` or \`UserFields\`.
`;

exports[`require-selections > invalid > should report an error with union 1`] = `
#### ⌨️ Code

      1 |   {
      2 |     userOrPost {
      3 |       ... on User {
      4 |         title
      5 |       }
      6 |     }
      7 |   }

#### ❌ Error

      1 |   {
    > 2 |     userOrPost {
        |                ^ Field \`userOrPost.id\` must be selected when it's available on a type.
    Include it in your selection set.
      3 |       ... on User {

#### 💡 Suggestion: Add \`id\` selection

    1 |   {
    2 |     userOrPost {
    3 |       ... on User {
    4 |         id title
    5 |       }
    6 |     }
    7 |   }
`;

exports[`require-selections > invalid > should report an error with union and fragment spread 1`] = `
#### ⌨️ Code

      1 |         {
      2 |           userOrPost {
      3 |             ... on User {
      4 |               ...UserFields
      5 |             }
      6 |           }
      7 |         }

#### ❌ Error

      1 |         {
    > 2 |           userOrPost {
        |                      ^ Field \`userOrPost.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragment \`UserFields\`.
      3 |             ... on User {

#### 💡 Suggestion: Add \`id\` selection

    1 |         {
    2 |           userOrPost {
    3 |             ... on User {
    4 |               id ...UserFields
    5 |             }
    6 |           }
    7 |         }
`;

exports[`require-selections > invalid > should report an error with union and non-inline fragment 1`] = `
#### ⌨️ Code

      1 |         {
      2 |           userOrPost {
      3 |             ...UnionFragment
      4 |           }
      5 |         }

#### ❌ Error

      1 |         {
    > 2 |           userOrPost {
        |                      ^ Field \`userOrPost.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragment \`UnionFragment\`.
      3 |             ...UnionFragment
`;

exports[`require-selections > invalid > should report an error with union and non-inline fragment and nested fragment 1`] = `
#### ⌨️ Code

      1 |         {
      2 |           userOrPost {
      3 |             ...UnionFragment
      4 |           }
      5 |         }

#### ❌ Error

      1 |         {
    > 2 |           userOrPost {
        |                      ^ Field \`userOrPost.id\` must be selected when it's available on a type.
    Include it in your selection set or add to used fragments \`UnionFragment\` or \`UserFields\`.
      3 |             ...UnionFragment
`;

exports[`require-selections > invalid > support multiple id field names 1`] = `
#### ⌨️ Code

      1 | { hasId { name } }

#### ⚙️ Options

    {
      "fieldName": [
        "id",
        "_id"
      ]
    }

#### ❌ Error

    > 1 | { hasId { name } }
        |         ^ Fields \`hasId.id\` or \`hasId._id\` must be selected when it's available on a type.
    Include it in your selection set.

#### 💡 Suggestion 1/2: Add \`id\` selection

    1 | { hasId { id name } }

#### 💡 Suggestion 2/2: Add \`_id\` selection

    1 | { hasId { _id name } }
`;
