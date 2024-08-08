module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  env: {
    node: true,
    es6: true,
  },
  extends: ['plugin:prettier/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
