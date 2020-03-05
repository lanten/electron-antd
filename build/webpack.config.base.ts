import path from 'path'
import webpack, { Configuration } from 'webpack'

import WebpackBar from 'webpackbar'
import TerserPlugin from 'terser-webpack-plugin'

import devConfig from './dev.config'

const { env } = devConfig
const { NODE_ENV, BUILD_ENV = 'dev' } = process.env
const ENV_CONFIG = env[BUILD_ENV]

const webpackConfig: Configuration = {
  mode: NODE_ENV as 'development' | 'production',

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../app'),
      '@root': path.resolve(__dirname, '../'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },

  plugins: [
    new webpack.DefinePlugin(
      ((): { [key: string]: any } => {
        const defines = {}
        const variables = Object.assign({}, ENV_CONFIG.variables)
        Object.keys(variables).forEach(key => {
          const val = variables[key]
          defines[`process.env.${key}`] = typeof val === 'string' ? `"${val}"` : JSON.stringify(val)
        })
        defines['$api'] = 'global.__$api'
        defines['$tools'] = 'global.__$tools'
        defines['$store'] = 'global.__$store'
        return defines
      })()
    ),
    new WebpackBar(),
  ] as webpack.Plugin[],
}

if (NODE_ENV === 'development') {
  webpackConfig.devtool = 'source-map'
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
