## Available Rules

Each rule has emojis denoting:

- 🚀 `graphql-eslint` rule
- 🔮 `graphql-js` rule
- 🔧 if some problems reported by the rule are automatically fixable by the `--fix` [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option
- ✅ if it belongs to the `recommended` configuration

<!-- 🚨 IMPORTANT! Do not manually modify this table. Run: `yarn generate:docs` -->
<!-- prettier-ignore-start -->
Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Description|🚀&nbsp;/&nbsp;🔮|🔧|✅
-|-|:-:|-|-
[alphabetize](rules/alphabetize.md)|Enforce arrange in alphabetical order for type fields, enum values, input object fields, operation selections and more.|🚀||
[description-style](rules/description-style.md)|Require all comments to follow the same style (either block or inline).|🚀||✅
[executable-definitions](rules/executable-definitions.md)|A GraphQL document is only valid for execution if all definitions are either operation or fragment definitions.|🔮||✅
[fields-on-correct-type](rules/fields-on-correct-type.md)|A GraphQL document is only valid if all fields selected are defined by the parent type, or are an allowed meta field such as `__typename`.|🔮||✅
[fragments-on-composite-type](rules/fragments-on-composite-type.md)|Fragments use a type condition to determine if they apply, since fragments can only be spread into a composite type (object, interface, or union), the type condition must also be a composite type.|🔮||✅
[input-name](rules/input-name.md)|Require mutation argument to be always called "input" and input type to be called Mutation name + "Input".|🚀||
[known-argument-names](rules/known-argument-names.md)|A GraphQL field is only valid if all supplied arguments are defined by that field.|🔮||✅
[known-directives](rules/known-directives.md)|A GraphQL document is only valid if all `@directives` are known by the schema and legally positioned.|🔮||✅
[known-fragment-names](rules/known-fragment-names.md)|A GraphQL document is only valid if all `...Fragment` fragment spreads refer to fragments defined in the same document.|🔮||✅
[known-type-names](rules/known-type-names.md)|A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.|🔮||✅
[lone-anonymous-operation](rules/lone-anonymous-operation.md)|A GraphQL document is only valid if when it contains an anonymous operation (the query short-hand) that it contains only that one operation definition.|🔮||✅
[lone-schema-definition](rules/lone-schema-definition.md)|A GraphQL document is only valid if it contains only one schema definition.|🔮||✅
[match-document-filename](rules/match-document-filename.md)|This rule allows you to enforce that the file name should match the operation name.|🚀||
[naming-convention](rules/naming-convention.md)|Require names to follow specified conventions.|🚀||✅
[no-anonymous-operations](rules/no-anonymous-operations.md)|Require name for your GraphQL operations. This is useful since most GraphQL client libraries are using the operation name for caching purposes.|🚀||✅
[no-case-insensitive-enum-values-duplicates](rules/no-case-insensitive-enum-values-duplicates.md)|Disallow case-insensitive enum values duplicates.|🚀|🔧|✅
[no-deprecated](rules/no-deprecated.md)|Enforce that deprecated fields or enum values are not in use by operations.|🚀||✅
[no-duplicate-fields](rules/no-duplicate-fields.md)|Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.|🚀||✅
[no-fragment-cycles](rules/no-fragment-cycles.md)|A GraphQL fragment is only valid when it does not have cycles in fragments usage.|🔮||✅
[no-hashtag-description](rules/no-hashtag-description.md)|Requires to use `"""` or `"` for adding a GraphQL description instead of `#`.|🚀||✅
[no-root-type](rules/no-root-type.md)|Disallow using root types `mutation` and/or `subscription`.|🚀||
[no-scalar-result-type-on-mutation](rules/no-scalar-result-type-on-mutation.md)|Avoid scalar result type on mutation type to make sure to return a valid state.|🚀||
[no-typename-prefix](rules/no-typename-prefix.md)|Enforces users to avoid using the type name in a field name while defining your schema.|🚀||✅
[no-undefined-variables](rules/no-undefined-variables.md)|A GraphQL operation is only valid if all variables encountered, both directly and via fragment spreads, are defined by that operation.|🔮||✅
[no-unreachable-types](rules/no-unreachable-types.md)|Requires all types to be reachable at some level by root level fields.|🚀|🔧|✅
[no-unused-fields](rules/no-unused-fields.md)|Requires all fields to be used at some level by siblings operations.|🚀|🔧|
[no-unused-fragments](rules/no-unused-fragments.md)|A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations.|🔮||✅
[no-unused-variables](rules/no-unused-variables.md)|A GraphQL operation is only valid if all variables defined by an operation are used, either directly or within a spread fragment.|🔮||✅
[one-field-subscriptions](rules/one-field-subscriptions.md)|A GraphQL subscription is valid only if it contains a single root field.|🔮||✅
[overlapping-fields-can-be-merged](rules/overlapping-fields-can-be-merged.md)|A selection set is only valid if all fields (including spreading any fragments) either correspond to distinct response names or can be merged without ambiguity.|🔮||✅
[possible-fragment-spread](rules/possible-fragment-spread.md)|A fragment spread is only valid if the type condition could ever possibly be true: if there is a non-empty intersection of the possible parent types, and possible types which pass the type condition.|🔮||✅
[possible-type-extension](rules/possible-type-extension.md)|A type extension is only valid if the type is defined and has the same kind.|🔮||✅
[provided-required-arguments](rules/provided-required-arguments.md)|A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.|🔮||✅
[require-deprecation-date](rules/require-deprecation-date.md)|Require deletion date on `@deprecated` directive. Suggest removing deprecated things after deprecated date.|🚀||
[require-deprecation-reason](rules/require-deprecation-reason.md)|Require all deprecation directives to specify a reason.|🚀||✅
[require-description](rules/require-description.md)|Enforce descriptions in your type definitions.|🚀||
[require-field-of-type-query-in-mutation-result](rules/require-field-of-type-query-in-mutation-result.md)|Allow the client in one round-trip not only to call mutation but also to get a wagon of data to update their application.|🚀||
[require-id-when-available](rules/require-id-when-available.md)|Enforce selecting specific fields when they are available on the GraphQL type.|🚀||✅
[scalar-leafs](rules/scalar-leafs.md)|A GraphQL document is valid only if all leaf fields (fields without sub selections) are of scalar or enum types.|🔮||✅
[selection-set-depth](rules/selection-set-depth.md)|Limit the complexity of the GraphQL operations solely by their depth. Based on [graphql-depth-limit](https://github.com/stems/graphql-depth-limit).|🚀||✅
[strict-id-in-types](rules/strict-id-in-types.md)|Requires output types to have one unique identifier unless they do not have a logical one. Exceptions can be used to ignore output types that do not have unique identifiers.|🚀||✅
[unique-argument-names](rules/unique-argument-names.md)|A GraphQL field or directive is only valid if all supplied arguments are uniquely named.|🔮||✅
[unique-directive-names](rules/unique-directive-names.md)|A GraphQL document is only valid if all defined directives have unique names.|🔮||✅
[unique-directive-names-per-location](rules/unique-directive-names-per-location.md)|A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.|🔮||✅
[unique-enum-value-names](rules/unique-enum-value-names.md)|A GraphQL enum type is only valid if all its values are uniquely named.|🔮||✅
[unique-field-definition-names](rules/unique-field-definition-names.md)|A GraphQL complex type is only valid if all its fields are uniquely named.|🔮||✅
[unique-fragment-name](rules/unique-fragment-name.md)|Enforce unique fragment names across your project.|🚀||
[unique-input-field-names](rules/unique-input-field-names.md)|A GraphQL input object value is only valid if all supplied fields are uniquely named.|🔮||✅
[unique-operation-name](rules/unique-operation-name.md)|Enforce unique operation names across your project.|🚀||
[unique-operation-types](rules/unique-operation-types.md)|A GraphQL document is only valid if it has only one type per operation.|🔮||✅
[unique-type-names](rules/unique-type-names.md)|A GraphQL document is only valid if all defined types have unique names.|🔮||✅
[unique-variable-names](rules/unique-variable-names.md)|A GraphQL operation is only valid if all its variables are uniquely named.|🔮||✅
[value-literals-of-correct-type](rules/value-literals-of-correct-type.md)|A GraphQL document is only valid if all value literals are of the type expected at their position.|🔮||✅
[variables-are-input-types](rules/variables-are-input-types.md)|A GraphQL operation is only valid if all the variables it defines are of input types (scalar, enum, or input object).|🔮||✅
[variables-in-allowed-position](rules/variables-in-allowed-position.md)|Variables passed to field arguments conform to type.|🔮||✅
<!-- prettier-ignore-end -->
