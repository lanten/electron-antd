import path from 'path'
import webpack, { Configuration } from 'webpack'

import htmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import tsImportPluginFactory from 'ts-import-plugin'

import webpackConfigBase from './webpack.config.base'
import devConfig from './dev.config'

const { dist, template, rendererSource: appPath } = devConfig
const { NODE_ENV } = process.env

const styleLoader = [{ loader: 'css-loader' }]

if (NODE_ENV === 'development') {
  styleLoader.unshift({ loader: 'css-hot-loader' }, { loader: 'style-loader' })
} else {
  styleLoader.unshift({ loader: MiniCssExtractPlugin.loader })
}

const webpackConfig: Configuration = {
  ...webpackConfigBase,
  target: 'electron-renderer',

  entry: {
    renderer: path.resolve(appPath, 'index.tsx'),
  },

  output: {
    path: path.join(dist, 'renderer'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /(?<!\.d)\.tsx?$/,
        loader: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory(/** options */)],
              }),
              compilerOptions: {
                module: 'es2015',
              },
            },
          },
          'eslint-loader',
        ],
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
          name: '[name].[ext]',
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'bundle',
    },
    minimizer: [],
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
  ] as webpack.Plugin[],
}

if (NODE_ENV === 'development') {
  webpackConfig.plugins?.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())
} else if (NODE_ENV === 'production') {
  // @ts-ignore
  webpackConfig.plugins?.push(new OptimizeCSSAssetsPlugin())
}

export default webpackConfig
