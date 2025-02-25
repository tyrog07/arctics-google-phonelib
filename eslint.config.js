// eslint.config.js
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
});

//eslint-disable-next-line
module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        require: 'readonly', // Define "require" as a global variable
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'error',
      eqeqeq: 'error', // Enforce the use of === and !==
      curly: 'error', // Enforce consistent brace style for all control statements
      'no-undef': 'error', // Disallow the use of undeclared variables
      quotes: ['error', 'single'], // Enforce the consistent use of single quotes
      semi: ['error', 'always'], // Require semicolons at the end of statements
      indent: ['error', 2], // Enforce consistent indentation of 2 spaces
      'linebreak-style': ['error', 'unix'], // Enforce consistent linebreak style
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'warn', // Require explicit return types on functions and class methods
      '@typescript-eslint/no-explicit-any': 'warn', // Disallow the use of `any` type
      'no-console': 'error', // Add this line to disallow console statements
      eqeqeq: 'error', // Enforce the use of === and !==
      curly: 'error', // Enforce consistent brace style for all control statements
      'no-undef': 'error', // Disallow the use of undeclared variables
      quotes: ['error', 'single'], // Enforce the consistent use of single quotes
      semi: ['error', 'always'], // Require semicolons at the end of statements
      indent: ['error', 2], // Enforce consistent indentation of 2 spaces
      'linebreak-style': ['error', 'unix'], // Enforce consistent linebreak style
    },
  },
  // Common configurations
  ...compat.extends('eslint:recommended'),
  ...compat.plugins('jest', '@typescript-eslint/eslint-plugin'),
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
