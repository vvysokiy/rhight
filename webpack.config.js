const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DIR_SRC = path.resolve(__dirname, 'packages');
const namespace = '@rhight';
const outputPackage = process.env.LERNA_PACKAGE_NAME.slice(`${namespace}/`.length);
const packageDir = path.resolve(DIR_SRC, outputPackage);
const outputDir = path.resolve(packageDir, 'dist');

module.exports = () => {
  const { peerDependencies } = JSON.parse(fs.readFileSync(path.resolve(packageDir, 'package.json')));
  let externalsList = [];
  if (peerDependencies) {
    externalsList = Object.keys(peerDependencies);
  }

  return {
    entry: './index.tsx',
    mode: 'production',
    output: {
      path: outputDir,
      libraryTarget: 'umd',
      globalObject: 'this',
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

    ...(externalsList.length ? { externals: externalsList } : {}),
  };
};
