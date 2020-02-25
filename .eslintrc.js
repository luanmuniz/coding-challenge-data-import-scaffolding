module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'import',
    '@typescript-eslint',
    'jest'
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        directory: '.',
      },
    }
  },
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  ignorePatterns: ['codegen.js', 'node_modules/', 'production-server/', 'db/', 'common/', 'scripts/'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': ['**/*test*.ts', '**/*.spec.ts', '**/*query-builder-spec.ts'] }],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'never'],
    'max-len': ['warn', { 'code': 500 }], // TODO reduce this to 100
    'import/order': ['error'],
    'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug', 'time', 'timeEnd'] }],
    'no-use-before-define': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement', 'ContinueStatement'],
    'jest/expect-expect': [
      'error',
      {
        'assertFunctionNames': ['expect', 'assertValidationError', 'assertValidUpdate', 'assertTerminalsOfPortIsReturned']
      }
    ],
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-use-before-define': 'off'
  },
  'overrides': [
    {
      files: ['*.ts'],
      rules: {
        // this is a required workaround to import types around the codebase
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
      }
    },
  ]
};