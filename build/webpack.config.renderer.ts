import path from 'path'
import webpack, { Configuration, WebpackPluginInstance } from 'webpack'

import WebpackBar from 'webpackbar'
import htmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
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
    publicPath: './',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /(?<!\.d)\.tsx?$/,
        use: [tsLoader, { loader: 'eslint-loader' }],
      },
      {
        test: /\.jsx?$/,
        use: [tsLoader, { loader: 'eslint-loader' }],
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
        test: /\.css$/,
        use: styleLoader,
      },
      {
        test: /\.(png|jpe?g|gif|svg|swf|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },

  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     name: 'bundle',
  //   },
  //   minimizer: [],
  // },

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
  ] as WebpackPluginInstance[],
}

if (NODE_ENV === 'development') {
  webpackConfig.plugins?.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())
} else if (NODE_ENV === 'production') {
  // @ts-ignore
  webpackConfig.plugins?.push(new OptimizeCSSAssetsPlugin())
}

export default webpackConfig
