module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'parser': '@typescript-eslint/parser',
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'keyword-spacing': ['error', { 'before': true }],
    'space-before-function-paren': ['error', 'always'],
    'no-multi-spaces': 'error',
    'space-before-blocks': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'func-call-spacing': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
}
