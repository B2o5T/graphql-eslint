// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Invalid #1 1`] = `
##### ❌ Error

    > 1 | scalar Old @deprecated(deletionDate: "22/08/2021")
        |        ^^^ "Old" сan be removed

##### 💡 Suggestion: Remove \`Old\`

    1 |
`;

exports[`Invalid #2 1`] = `
##### ⚙️ Options

    {
      "argumentName": "untilDate"
    }

##### ❌ Error

    > 1 | scalar Old @deprecated(untilDate: "22/08/2021")
        |        ^^^ "Old" сan be removed

##### 💡 Suggestion: Remove \`Old\`

    1 |
`;

exports[`Invalid #3 1`] = `
##### ❌ Error

    > 1 | scalar Old @deprecated(deletionDate: "bad")
        |                                      ^^^^^ Deletion date must be in format "DD/MM/YYYY"
`;

exports[`Invalid #4 1`] = `
##### ❌ Error

    > 1 | scalar Old @deprecated(deletionDate: "32/08/2021")
        |                                      ^^^^^^^^^^^^ Invalid "32/08/2021" deletion date
`;

exports[`Invalid #5 1`] = `
##### ❌ Error

    > 1 | type Old { oldField: ID @deprecated }
        |                          ^^^^^^^^^^ Directive "@deprecated" must have a deletion date
`;
