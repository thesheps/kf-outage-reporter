/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "test-report/coverage",
  reporters: [ "default", "jest-junit" ],
  testPathIgnorePatterns : [
    "<rootDir>/src/__tests__/testData/" 
  ],
  globals: {
    "BASE_PATH": "https://foo.bar.com",
    "API_KEY": "beans-on-toast"
  }
};
