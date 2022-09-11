/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^.+\\.css$': "<rootDir>/__mocks__/styleMock.js",
  }
}
