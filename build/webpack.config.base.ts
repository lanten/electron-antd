import path from 'path'
import webpack, { Configuration } from 'webpack'
import ESLintPlugin from 'eslint-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

import buildConfig from './config'

const rootPath = process.cwd()
const { env, COMMON_ENV } = buildConfig
const { NODE_ENV, BUILD_ENV = 'dev' } = process.env
const ENV_CONFIG = env[BUILD_ENV]

const webpackConfig: Configuration = {
  mode: NODE_ENV as 'development' | 'production',
  stats: 'errors-warnings',
  infrastructureLogging: {
    level: 'warn',
    appendOnly: true,
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    alias: {
      '@': path.resolve(rootPath, 'app'),
      '@root': path.resolve(rootPath),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  plugins: [
    new ESLintPlugin(),

    new webpack.DefinePlugin(
      ((): { [key: string]: any } => {
        const defines = {}
        const envs = Object.assign({}, COMMON_ENV, ENV_CONFIG)
        Object.keys(envs).forEach((key) => {
          const val = envs[key]
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
    })
  )
}

export default webpackConfig
