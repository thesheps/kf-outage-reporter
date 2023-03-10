/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  runner: 'groups',
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "test-report/coverage",
  reporters: [ "default", "jest-junit" ],
  testPathIgnorePatterns : [
    "<rootDir>/src/__tests__/testData/" 
  ],
  setupFiles: ['<rootDir>/.jest/setup.js'],
};
