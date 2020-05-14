module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb'],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures:  {
      jsx:  true,
    },
  },
  // settings: {
  //   'import/core-modules': ['enzyme', 'jest'],
  // },
  rules: {
    // 'react/sort-comp': 0,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    // 'react/state-in-constructor': 0,
    // 'react/static-property-placement': 0,
    'import/no-unresolved': 0,
    // 'no-unused-expressions': ['error', {allowShortCircuit: true}],
    'no-unused-vars': 0,
    // 'no-param-reassign': ['error', {props: false}],
    'import/prefer-default-export': 0,
    "import/extensions": 0,
    // 'import/no-extraneous-dependencies': 0,
    // 'no-plusplus': ['error', {allowForLoopAfterthoughts: true}],
    // '@typescript-eslint/no-unused-vars': 2,
    // 'jsx-a11y/no-autofocus': 0,
    // 'jsx-a11y/click-events-have-key-events': 0,
    // 'jsx-a11y/no-static-element-interactions': 0,
    // 'jsx-a11y/alt-text': 0
    'jsx-a11y/label-has-associated-control': [ 2, {
      "required": {
          "some": [ "nesting", "id" ]
      }
    }]
  },
  globals: {
    // IntersectionObserver: true,
    window: true,
    document: true,
    // fetch: true,
    // jest: true,
    // expect: true,
    // test: true,
    // __TEST__: true,
    // __DEV__: true,
    // beforeEach: true,
    // beforeAll: true,
    // afterAll: true,
    // afterEach: true,
    // describe: true,
    // it: true
  },
}
