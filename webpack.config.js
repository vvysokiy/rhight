// const loaderUtils = require('loader-utils');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const DIR_SRC = path.resolve(__dirname, 'packages');
const fs = require('fs');
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
    // libraryTarget: 'commonjs2',
    libraryTarget: 'umd',
    globalObject: 'this',
    // hotUpdateFunction: 'webpackHotUpdateRUI',
    filename: 'index.js',
  },

  optimization: {
    // minimize: true,
    minimize: false,
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
        options: {
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
    },
  },


  externals: function (ctx, callback) {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(ctx.context, 'package.json')));
    const { peerDependencies } = packageJson;
    let externalsList = [];
    if (peerDependencies) externalsList = Object.keys(peerDependencies);
    console.log('🚀 ~ file: webpack.config.js ~ line 116 ~ peerDependencies', peerDependencies);
    // The external is a `commonjs2` module located in `@scope/library`
    callback(null, externalsList, 'commonjs');
  },

  externals: [
    'react',
    'react-dom',
  ]
};
