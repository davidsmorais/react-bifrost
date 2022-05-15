module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['warn'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unsafe-call': ['off'],
    '@typescript-eslint/no-unsafe-member-access': ['off'],
    '@typescript-eslint/no-unsafe-assignment': ['off'],
    '@typescript-eslint/no-unsafe-argument': ['off'],
    '@typescript-eslint/no-unsafe-return': ['off'],
    '@typescript-eslint/camelcase': ['off'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['warn'],
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'all',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    'no-console': [
      'error',
      {
        allow: ['error']
      }
    ],
    eqeqeq: ['error', 'always'],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          ['index', 'sibling', 'parent', 'internal']
        ],
        pathGroupsExcludedImportTypes: [],
        pathGroups: [
          {
            pattern: '+(react|phaser)',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '^types(/.*)?$',
            group: 'index',
            position: 'before'
          }
        ],
        alphabetize: {
          order: 'asc'
        }
      }
    ]
  },
  ignorePatterns: [
    'scripts/',
    '*.config.js',
    'src/assets.ts',
    'src/utils/AssetLoader.ts',
    '.eslintrc.js'
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './'
      }
    }
  }
}
