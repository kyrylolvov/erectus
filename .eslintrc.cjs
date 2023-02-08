module.exports = {
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],
  plugins: ['react', 'import', 'unused-imports', 'simple-import-sort', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['src/@types/utils.ts', 'src/services/converter/**', 'src/test.ts'],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/no-unknown-property': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'prettier/prettier': 'error',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
  },
};
