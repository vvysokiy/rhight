const path = require("path");
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({config, mode}) => {
  config.resolve = {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      '@rhight': path.resolve(__dirname, '../packages'),
      // '@styles': path.resolve(__dirname, '../packages'),
      // 'images': path.resolve(__dirname, '../src/images'),
      // '@utils': path.resolve(__dirname, '../src/utils'),
      // '@constants': path.resolve(__dirname, './src/constants'),
    },
    // plugins: [
    //   new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../tsconfig.json') }),
    // ],
  };

  config.module.rules = [
    // {
    //   test: /\.md$/,
    //   use: ['raw-loader']
    // },
    {
      test: /\.(tsx|ts)$/,
      use: [
        'awesome-typescript-loader',
        {
          loader: 'react-docgen-typescript-loader',
          options: {
            shouldExtractLiteralValuesFromEnum: true
          }
        }
      ]
    },
    {
      test: /\.css$/,
      use:  [
        'style-loader',
        {
          loader:  'css-loader',
          options: {
            modules:         true,
            // importLoaders:   1,
            localIdentName:  '[path]_[local]__[hash:base64:3]',
          },
        },
        'postcss-loader'
      ],
    },
    {
      test: /\.svg$/,
      use:  ['@svgr/webpack'],
    }
  ];

  return config;
};

