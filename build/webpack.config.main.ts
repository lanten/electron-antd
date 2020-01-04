import path from 'path'
import webpack, { Configuration } from 'webpack'

import WebpackBar from 'webpackbar'
import TerserPlugin from 'terser-webpack-plugin'

import devConfig from './dev.config'

const { dist, alias, provide, env, mainSource: appPath } = devConfig
const { NODE_ENV, BUILD_ENV = 'dev' } = process.env

const ENV_CONFIG = env[BUILD_ENV]

export const webpackConfig: Configuration = {
  mode: NODE_ENV as 'development' | 'production',
  target: 'electron-main',
  watch: true,

  entry: {
    main: path.join(appPath, 'index.ts'),
  },

  resolve: {
    alias,
    extensions: ['.ts', '.js'],
  },

  output: {
    publicPath: ENV_CONFIG.publicPath,
    path: path.join(dist, 'main'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /(?<!\.d)\.ts$/,
        loader: ['ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        include: appPath,
        loader: ['ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  optimization: {
    splitChunks: {
      name: 'bundle',
    },
    minimizer: [],
  },

  plugins: [
    new webpack.DefinePlugin(
      ((): { [key: string]: any } => {
        const defines = {}
        const variables = Object.assign({}, ENV_CONFIG.variables)
        Object.keys(variables).forEach(key => {
          const val = variables[key]
          defines[`process.env.${key}`] = typeof val === 'string' ? val : JSON.stringify(val)
        })
        return defines
      })()
    ),
    new WebpackBar(),
    new webpack.ProvidePlugin(provide),
  ],
}

// 开发环境配置
if (NODE_ENV === 'development') {
  webpackConfig.devtool = 'source-map'

  // webpackConfig.plugins?.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())

  // 生产环境配置
} else if (NODE_ENV === 'production') {
  webpackConfig.optimization?.minimizer?.push(
    // https://github.com/terser-js/terser
    new TerserPlugin({
      terserOptions: {
        compress: {
          warnings: true,
          /* eslint-disable */
          drop_console: true,
        },
      },
    })
  )
}

export default webpackConfig
