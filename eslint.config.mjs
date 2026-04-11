import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import nodePlugin from 'eslint-plugin-n';
import security from 'eslint-plugin-security';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['dist/'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.{ts,mts,cts}'],
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
  nodePlugin.configs['flat/recommended'],
  security.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['*.config.{js,mjs,ts}'],
    rules: {
      'n/no-unpublished-import': 'off',
    },
  },
  {
    files: ['**/*.{ts,mts,cts}'],
    rules: {
      'n/no-missing-import': ['error', { tryExtensions: ['.ts', '.js', '.json'] }],
    },
  },
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      'no-implicit-coercion': 'error',
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
      'no-return-await': 'error',
    },
  },
]);
