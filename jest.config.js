export default {
  modulePathIgnorePatterns: ['/dist/'],
  moduleNameMapper: {
    '@graphql-eslint/eslint-plugin': '<rootDir>/packages/plugin/src/index.ts',
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  snapshotSerializers: ['jest-snapshot-serializer-raw/always'],
  snapshotResolver: './snapshot-resolver.cjs',
};
