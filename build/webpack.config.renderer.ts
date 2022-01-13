import path from 'path'
import webpack, { Configuration } from 'webpack'

import WebpackBar from 'webpackbar'
import htmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import tsImportPluginFactory from 'ts-import-plugin'

import webpackConfigBase from './webpack.config.base'
import buildConfig from './config'

const { dist, template, rendererSource: appPath } = buildConfig
const { NODE_ENV } = process.env

const styleLoader = [{ loader: 'css-loader' }]

if (NODE_ENV === 'development') {
  styleLoader.unshift({ loader: 'css-hot-loader' }, { loader: 'style-loader' })
} else {
  styleLoader.unshift({ loader: MiniCssExtractPlugin.loader })
}

const tsLoader: webpack.RuleSetUseItem = {
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
    getCustomTransformers: (): any => ({
      before: [tsImportPluginFactory(/** options */)],
    }),
    // compilerOptions: {
    //   module: 'es2015',
    // },
  },
}

const webpackConfig: Configuration = {
  ...webpackConfigBase,
  target: 'electron-renderer',

  entry: {
    renderer: path.resolve(appPath, 'index.tsx'),
  },

  output: {
    path: path.join(dist, 'renderer'),
    publicPath: NODE_ENV === 'development' ? '' : './',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /(?<!\.d)\.tsx?$/,
        use: [tsLoader],
      },
      {
        test: /\.jsx?$/,
        use: [tsLoader],
        exclude: /node_modules/,
      },
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
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          ...styleLoader,
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: styleLoader,
      },
      {
        test: /\.(png|jpe?g|gif|svg|swf|woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    ...(webpackConfigBase?.plugins ?? []),
    new htmlWebpackPlugin({
      template: template,
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),

    new WebpackBar({ name: 'Renderer' }),
  ],
}

if (NODE_ENV === 'development') {
  webpackConfig.devtool = 'eval-source-map' // 高质量 source map
} else if (NODE_ENV === 'production') {
  webpackConfig.optimization = {
    minimizer: [
      // https://github.com/webpack-contrib/css-minimizer-webpack-plugin
      new CssMinimizerPlugin(),
    ],
  }
}

export default webpackConfig
