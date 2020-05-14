// const loaderUtils = require('loader-utils');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const DIR_SRC = path.resolve(__dirname, 'packages');
// const DIR_UTILS = path.resolve(__dirname, 'src/utils');
// const DIR_CONSTANTS = path.resolve(__dirname, 'src/constants');
const namespace = '@rhight';
const outputPackage = process.env.LERNA_PACKAGE_NAME.slice(`${namespace}/`.length);
const outputDir = path.resolve(__dirname, 'packages', outputPackage, 'dist');
// const isVerbose = process.argv.includes('--verbose');

module.exports = {
  entry: './index.tsx',
  mode: 'production',
  output: {
    path: outputDir,
    libraryTarget: 'commonjs2',
    hotUpdateFunction: 'webpackHotUpdateRUI',
    filename: 'index.js',
  },

  optimization: {
    minimize: true,
  },

  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'babel-loader',
        include: [
          DIR_SRC,
          // DIR_UTILS, DIR_CONSTANTS
        ],
        exclude: [
          /node_modules/,
        ],
        query: {
          babelrc: false,
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: [
                  'last 2 versions',
                  'not ie <= 10',
                ],
              },
              modules: false,
              useBuiltIns: false,
              debug: false,
            }],
            ['@babel/typescript', { allExtensions: true, isTSX: true }],
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/proposal-object-rest-spread',
            '@babel/proposal-class-properties',
            '@babel/transform-react-constant-elements',
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      [namespace]: path.resolve(__dirname, 'packages'),
      // '@styles': DIR_SRC,
      // images: path.resolve(__dirname, './src/images'),
      // '@utils': DIR_UTILS,
      // '@constants': DIR_CONSTANTS,
    },
    // plugins: [
    //   new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, 'tsconfig.json') }),
    // ],
  },

  // TODO webpack-node-externals
  // externals: [
  //   'prop-types',
  //   'react',
  //   'react-dom',
  //   'isomorphic-fetch',
  //   'lodash.debounce',
  //   'lodash/isEmpty',
  //   'classnames',
  //   'common-tags',
  //   'zlib',
  //   'uuid',
  //   'querystring',
  //   /^@rambler-components/,
  //   /^@babel\/runtime/,
  // ],

  // stats: {
  //   assets: isVerbose,
  //   modules: isVerbose,
  //   colors: isVerbose,
  //   hash: isVerbose,
  //   version: isVerbose,
  //   timings: isVerbose,
  //   chunks: isVerbose,
  //   chunkModules: isVerbose,
  //   entrypoints: isVerbose,
  //   cached: isVerbose,
  //   cachedAssets: isVerbose,
  // },
};
