module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ['error', 'never'],
    'no-console': 0,
    'no-throw-literal': 0,
    'linebreak-style': 0,
    'jsx-quotes': ['error', 'prefer-single'],
  },
}
