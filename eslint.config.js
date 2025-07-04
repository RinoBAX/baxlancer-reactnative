// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  {
    ...expoConfig,
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './']],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.png'],
        },
      },
    },
    plugins: {
      ...expoConfig.plugins,
      import: require('eslint-plugin-import'),
    },
    rules: {
      ...expoConfig.rules,
      'import/no-unresolved': 'error',
    },
  },
  {
    ignores: ['dist/*'],
  },
]);

