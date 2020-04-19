const path = require('path');

module.exports = {
  plugins: {
    stylelint: {},
    'postcss-import': {
      path: [path.resolve(__dirname, 'src/css')],
    },
    'postcss-nested': {},
    'postcss-simple-vars': {},
    'postcss-mixins': {},
    'postcss-preset-env': {
      browsers: ['last 2 versions', '> 5%'],
    },
  },
};
