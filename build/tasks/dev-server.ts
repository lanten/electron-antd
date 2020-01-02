import chalk from 'chalk'
import webpack from 'webpack'

import WebpackDevServer from 'webpack-dev-server'

import devConfig from '../../config/dev.config'
import webpackConfig from '../webpack.config.renderer'

process.env.NODE_ENV = 'development'

const { BUILD_ENV } = process.env
const { env, port, host, proxy } = devConfig

const publicPath = env.dev.publicPath

const devServerOptions = {
  host,
  publicPath,
  disableHostCheck: true,
  hot: true,
  noInfo: true,
  proxy: proxy,
  quiet: true, // 关闭编译日志
  historyApiFallback: true,
  compress: true,
}

const hotClient = ['webpack-dev-server/client', 'webpack/hot/only-dev-server']
if (typeof webpackConfig.entry === 'object') {
  Object.keys(webpackConfig.entry).forEach(name => {
    if (!webpackConfig.entry) throw new Error(webpackConfig.entry)
    const value = webpackConfig.entry[name]
    if (Array.isArray(value)) {
      value.unshift(...hotClient)
    } else {
      webpackConfig.entry[name] = [...hotClient, value]
    }
  })
} else {
  webpackConfig.entry = [...hotClient, webpackConfig.entry] as string[]
}
WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions)

console.log(chalk.cyan('\nStarting the development server...\n'))

const webpackCompiler = webpack(webpackConfig)

const server = new WebpackDevServer(webpackCompiler, devServerOptions)

server.listen(port, host, err => {
  if (err) {
    return console.info(chalk.red(err.message))
  } else {
    console.log(`Server local at ${chalk.magenta.underline(`http://${host}:${port}${publicPath}`)}`)
  }
})
