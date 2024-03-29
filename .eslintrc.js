module.exports = {
  settings: {
    react: {
      version: require('./package.json').dependencies.react,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  },
  parser: 'babel-eslint'
}
