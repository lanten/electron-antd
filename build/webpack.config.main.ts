import path from 'path'
import { Configuration, WebpackPluginInstance } from 'webpack'

import WebpackBar from 'webpackbar'

import webpackConfigBase from './webpack.config.base'
import buildConfig from './config'

const { dist, mainSource: appPath } = buildConfig

const webpackConfig: Configuration = {
  ...webpackConfigBase,
  target: 'electron-main',

  entry: {
    main: path.join(appPath, 'index.ts'),
  },

  output: {
    path: path.join(dist, 'main'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /(?<!\.d)\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    ...(webpackConfigBase?.plugins ?? []),
    new WebpackBar({ name: 'Main    ', color: '#799AFE' }),
  ] as WebpackPluginInstance[],
}

export default webpackConfig
