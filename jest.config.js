/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: "test-report/coverage",
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "🐙 💪 - Outage reporter test results",
        outputPath: "./test-report/jest/index.html",
        sort: "titleAsc"
      }
    ]
  ],
};
