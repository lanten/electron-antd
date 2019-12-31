const path = require('path')
const webpack = require('webpack')

const WebpackBar = require('webpackbar')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const devConfig = require('./dev.config')

const { dist, template, alias, provide, env, htmlConfig, projectName, projectTitle } = devConfig
const { NODE_ENV, BUILD_ENV } = process.env

const styleLoader = [{ loader: 'css-loader' }]

if (NODE_ENV === 'development') {
  styleLoader.unshift({ loader: 'css-hot-loader' }, { loader: 'style-loader' })
} else {
  styleLoader.unshift({ loader: MiniCssExtractPlugin.loader })
}

console.log(NODE_ENV)

const appPath = path.join(__dirname, '../src')
const ENV_CONFIG = env[BUILD_ENV]

const webpackConfig = {
  mode: NODE_ENV,

  entry: {
    // iconfont: `${appPath}/assets/iconfont/iconfont.css`,
    app: `${appPath}/index.tsx`,
  },

  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js'],
  },

  output: {
    publicPath: ENV_CONFIG.publicPath,
    path: dist,
    filename: 'js/[name].[hash:7].js',
    chunkFilename: 'js/[name].[chunkhash:7].js',
  },

  module: {
    rules: [
      {
        test: /\.d\.ts$/,
        loader: 'ignore-loader',
      },
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
              // modifyVars: {
              //   // antd 更改主题色
              //   hack: `true; @import "${path.join(process.cwd(), 'src/styles/antd-theme.less')}";`, // Override with less file
              // },
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
          name: '[name]-[hash:7].[ext]',
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
      (variables => {
        let defines = {}
        variables = Object.assign({}, variables)
        Object.keys(variables).forEach(key => {
          defines[`process.env.${key}`] = JSON.stringify(variables[key])
        })
        defines['process.env.PROJECT_NAME'] = `'${projectName}'`
        defines['process.env.PROJECT_TITLE'] = `'${projectTitle}'`
        return defines
      })(ENV_CONFIG.variables)
    ),
    new WebpackBar(),
    new htmlWebpackPlugin({
      template: template,
      filename: 'index.html',
      favicon: devConfig.favicon,
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

  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())

  // 生产环境配置
} else if (NODE_ENV === 'production') {
  webpackConfig.plugins.push(new OptimizeCSSAssetsPlugin())

  webpackConfig.optimization.minimizer.push(
    // https://github.com/terser-js/terser
    new TerserPlugin({
      terserOptions: {
        compress: {
          warnings: true,
          drop_console: true,
        },
      },
    })
  )
}

module.exports = webpackConfig
