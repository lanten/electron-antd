import path from 'path'
import webpack, { Configuration } from 'webpack'

import TerserPlugin from 'terser-webpack-plugin'

import devConfig from './dev.config'

const { env } = devConfig
const { NODE_ENV, BUILD_ENV = 'dev' } = process.env
const ENV_CONFIG = env[BUILD_ENV]

const rootPath = process.cwd()

const webpackConfig: Configuration = {
  mode: NODE_ENV as 'development' | 'production',

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    alias: {
      '@': path.resolve(rootPath, 'app'),
      '~': rootPath,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  plugins: [
    new webpack.DefinePlugin(
      ((): { [key: string]: any } => {
        const defines = {}
        const variables = Object.assign({}, ENV_CONFIG.variables)
        Object.keys(variables).forEach((key) => {
          const val = variables[key]
          defines[`process.env.${key}`] = typeof val === 'string' ? `"${val}"` : JSON.stringify(val)
        })
        defines['$api'] = 'global.__$api'
        defines['$tools'] = 'global.__$tools'
        defines['$store'] = 'global.__$store'
        return defines
      })()
    ),
  ],
}

if (NODE_ENV === 'development') {
  webpackConfig.devtool = 'source-map'
} else if (NODE_ENV === 'production') {
  webpackConfig.optimization?.minimizer?.push(
    // https://github.com/terser-js/terser
    new TerserPlugin({
      terserOptions: {
        compress: {
          // 生产环境移除 log
          pure_funcs: ['console.log'],
        },
      },
      extractComments: false, // 不提取任何注释
    }) as unknown as webpack.WebpackPluginInstance
  )
}

export default webpackConfig
