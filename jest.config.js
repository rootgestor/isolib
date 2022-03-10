module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/stories/',
    '/.storybook/',
    '/dist/',
    '/deprecated/',
  ],
  testTimeout: 20000,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: this.coveragePathIgnorePatterns,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.tsx',
    '!**/node_modules/**',
  ],
};
