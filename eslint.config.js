// eslint.config.js
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const globals = require('globals');

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': ['error', { allow: ['error'] }],
      eqeqeq: 'error', // Enforce the use of === and !==
      curly: 'error', // Enforce consistent brace style for all control statements
      'no-undef': 'error', // Disallow the use of undeclared variables
      quotes: ['error', 'single'], // Enforce the consistent use of single quotes
      semi: ['error', 'always'], // Require semicolons at the end of statements
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        // project: './tsconfig.json', // Uncomment if you have a tsconfig.json
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs['recommended'].rules,
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-function-return-type': 'warn', // Require explicit return types on functions and class methods
      '@typescript-eslint/no-explicit-any': 'warn', // Disallow the use of `any` type
      'no-console': ['error', { allow: ['error'] }], // Add this line to disallow console statements
      eqeqeq: 'error', // Enforce the use of === and !==
      curly: 'error', // Enforce consistent brace style for all control statements
      'no-undef': 'error', // Disallow the use of undeclared variables
      quotes: ['error', 'single'], // Enforce the consistent use of single quotes
      semi: ['error', 'always'], // Require semicolons at the end of statements
    },
  },
  // Common configurations
  ...compat.extends('eslint:recommended'),
  ...compat.plugins('jest'),
  {
    files: ['**/*.js', '**/*.ts'],
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
  {
    ignores: [
      'node_modules/',
      'packages/google-phonelib-js/glib/',
      'packages/google-phonelib-js/src/template/',
      'packages/google-phonelib-js/src/providers/',
      'packages/google-phonelib-js/dist/',
      'packages/google-phonelib-js/glib/',
      'packages/arctics-google-phonelib/build/',
      'packages/arctics-google-phonelib/dist/',
      'packages/arctics-google-phonelib/src/*.d.ts',
    ],
  },
];
