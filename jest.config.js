module.exports = {
  verbose: true,
  testTimeout: 30000,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.test.ts$',
  moduleNameMapper: {
    '@root(.*)$': '<rootDir>$1',
    '@app(.*)$': '<rootDir>/app$1',
    '@database(.*)$': '<rootDir>/database$1',
    '@repositories(.*)$': '<rootDir>/repositories$1'
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', 'src/database/*', 'src/__test__/matcher/*', 'src/__test__/util/*'],
  coveragePathIgnorePatterns: ['node_modules/*', '<rootDir>/app/*', '<rootDir>/database/*', '<rootDir>/__test__/matcher/*', '<rootDir>/__test__/util/*', '<rootDir>/main.ts'],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageDirectory: '../coverage',
  reporters: ['default', 'jest-junit']
}
