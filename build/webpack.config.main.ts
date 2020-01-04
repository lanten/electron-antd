import path from 'path'
import { Configuration } from 'webpack'

import webpackConfigBase from './webpack.config.base'
import devConfig from './dev.config'

const { dist, mainSource: appPath } = devConfig

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
}

export default webpackConfig
