const rootPath = process.cwd()

module.exports = {
  testURL: 'http://localhost/',
  rootDir: rootPath,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
}
