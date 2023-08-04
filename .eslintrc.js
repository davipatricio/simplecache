module.exports = {
  root: true,
  extends: ['neon/common', 'neon/node', 'neon/typescript', 'neon/prettier'],
  plugins: ['prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['**/dist/*', '**/*.js'],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    'prettier/prettier': 'error',
    'tsdoc/syntax': 'off',
  },
};
