module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/__mocks__/css.mock.js',
  },
}
