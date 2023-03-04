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
        pageTitle: "Outage Reporter Test Results",
        outputPath: "./test-report/index.html",
        sort: "titleAsc"
      }
    ]
  ],
};
