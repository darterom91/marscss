const merge = require('webpack-merge');
const sharedConfig = require('./shared.js');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = merge(sharedConfig, {
  devtool: 'sourcemap',
  devServer: {
    progress: false
  },
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    maxModules: 0,
    modules: false,
    performance: false,
    providedExports: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: true,
    usedExports: false,
    version: false,
    warnings: false
  },
  output: {
    pathinfo: false
  },
  node: {
    console: false
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'marscss',
      suppressSuccess: true
    })
  ]
});
