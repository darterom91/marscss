const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const Clean = require('clean-webpack-plugin');
const { resolve } = require('path');
const { sync } = require('glob');

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = 'dist';
const examplePath = './source/stylesheets/examples/';

process.noDeprecation = true;

module.exports = {
  entry: {
    body: './source/javascripts/body.js',
    head: './source/javascripts/head.js',
    application: './source/stylesheets/application.scss',
    exampleGettingStarted: examplePath + 'example-getting-started.scss',
    exampleReset: examplePath + 'example-reset.scss',
    exampleElements: examplePath + 'example-elements.scss',
    exampleCard: examplePath + 'example-card.scss',
    exampleComponents: examplePath + 'example-components.scss',
    images: sync('./source/images/**/*', { nodir: true }),
    vendor: ['lodash', 'jquery']
  },

  output: {
    path: resolve(publicPath),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env']]
          }
        }
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: 'import-glob-loader',
        enforce: 'pre'
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [resolve('node_modules')]
              }
            }
          ]
        })
      },
      {
        test: /fonts\/.*\.(svg|eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '',
              // can't use 'fonts' because it conflicts with Middleman
              name: isProduction
                ? 'fnt/[name]-[hash].[ext]'
                : 'fnt/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /images\/.*\.(jpg|jpeg|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '',
              outputPath: 'img/',
              context: 'source/images/',
              // can't use 'images' because it conflicts with Middleman
              name: isProduction
                ? '[path][name]-[hash].[ext]'
                : '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: require.resolve('jquery'),
        use: ['expose-loader?$', 'expose-loader?jQuery']
      },
      {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        use: ['modernizr-loader', 'json-loader']
      }
    ]
  },

  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.sass',
      '.scss',
      '.css',
      '.png',
      '.svg',
      '.gif',
      '.jpeg'
    ],
    modules: [resolve('source/javascripts'), 'node_modules'],
    alias: {
      assets: resolve('source/'),
      modernizr$: resolve('.modernizrrc')
    }
  },

  resolveLoader: {
    modules: ['node_modules']
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))),
    new Clean([publicPath], {
      root: resolve()
    }),
    new ExtractTextPlugin(
      isProduction ? '[name].bundle-[hash].css' : '[name].bundle.css'
    ),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new ManifestPlugin({
      publicPath: '/',
      writeToFileEmit: true
    })
  ]
};
