module.exports = {
  moduleFileExtensions: ['js', 'json'],
  testRegex: ['.spec.js$', '.test.js$'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/node_modules'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/common'
  ]
};
