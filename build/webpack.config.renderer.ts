import path from 'path'
import webpack, { Configuration } from 'webpack'

import WebpackBar from 'webpackbar'
import htmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

import devConfig from './dev.config'

const { dist, template, alias, provide, env, htmlConfig, rendererSource: appPath } = devConfig
const { NODE_ENV, BUILD_ENV = 'dev' } = process.env

const styleLoader = [{ loader: 'css-loader' }]

if (NODE_ENV === 'development') {
  styleLoader.unshift({ loader: 'css-hot-loader' }, { loader: 'style-loader' })
} else {
  styleLoader.unshift({ loader: MiniCssExtractPlugin.loader })
}

console.log(`NODE_ENV=${NODE_ENV}`)

const ENV_CONFIG = env[BUILD_ENV]

export const webpackConfig: Configuration = {
  mode: NODE_ENV as 'development' | 'production',
  target: 'electron-renderer',

  entry: {
    renderer: path.resolve(appPath, 'index.tsx'),
  },

  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js'],
  },

  output: {
    publicPath: ENV_CONFIG.publicPath,
    path: path.join(dist, 'renderer'),
    filename: 'js/[name].[hash:7].js',
    chunkFilename: 'js/[name].[chunkhash:7].js',
  },

  module: {
    rules: [
      // {
      //   test: /\.d\.ts$/,
      //   loader: 'ignore-loader',
      // },
      {
        test: /(?<!\.d)\.tsx?$/,
        loader: ['babel-loader', 'ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js[x]?$/,
        include: appPath,
        loader: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.json$/,
      //   loader: ['json-loader'],
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(sass|scss)$/,
        use: [
          ...styleLoader,
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          ...styleLoader,
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: styleLoader,
      },
      {
        test: /\.(png|jpe?g|gif|svg|swf|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          // limit: 10000,
          name: 'assets/[name]-[hash:7].[ext]',
        },
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
    new htmlWebpackPlugin({
      template: template,
      filename: 'index.html',
      templateParameters: htmlConfig,
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:7].css',
      chunkFilename: '[name]-[chunkhash:7].css',
    }),
    new webpack.ProvidePlugin(provide),
  ],
}

// 开发环境配置
if (NODE_ENV === 'development') {
  webpackConfig.devtool = 'source-map'

  webpackConfig.plugins?.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())

  // 生产环境配置
} else if (NODE_ENV === 'production') {
  webpackConfig.plugins?.push(new OptimizeCSSAssetsPlugin())

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
