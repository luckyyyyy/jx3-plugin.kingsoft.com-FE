// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/recommended', // or 'plugin:vue/base'
    'airbnb-base',
  ],
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // check if imports actually resolve
  'settings': {
    "html/html-extensions": [".html"],  // don't include .vue
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.config.js'
      }
    },

  },
  // add your custom rules here
  'rules': {
    "arrow-body-style": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "prefer-promise-reject-errors": 0,
    "no-return-assign": 0,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    "max-len": process.env.NODE_ENV === 'production' ? 1 : 0,
    "no-unused-vars": process.env.NODE_ENV === 'production' ? 1 : 0,
    "no-console": process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
