// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`Invalid #1 1`] = `
#### ⌨️ Code

      1 | enum A { TEST TesT }

#### ❌ Error

    > 1 | enum A { TEST TesT }
        |               ^^^^ Unexpected case-insensitive enum values duplicates for value "TesT" in enum "A"

#### 💡 Suggestion: Remove \`TesT\` enum value

    1 | enum A { TEST  }
`;

exports[`Invalid #2 1`] = `
#### ⌨️ Code

      1 | extend enum A { TEST TesT }

#### ❌ Error

    > 1 | extend enum A { TEST TesT }
        |                      ^^^^ Unexpected case-insensitive enum values duplicates for value "TesT" in enum "A"

#### 💡 Suggestion: Remove \`TesT\` enum value

    1 | extend enum A { TEST  }
`;
