import chalk from 'chalk'
import webpack from 'webpack'
import address from 'address'
import WebpackDevServer from 'webpack-dev-server'

import { port, proxy, env, devHost } from '../dev.config'
import webpackConfig from '../webpack.config'

process.env.NODE_ENV = 'development'

const { BUILD_ENV } = process.env

const host = (BUILD_ENV === 'dev' ? devHost : address.ip()) || '0.0.0.0'

const publicPath = env.dev.publicPath

const devServerOptions = {
  host,
  publicPath,
  disableHostCheck: true,
  hot: true,
  noInfo: true,
  proxy,
  // quiet: true, // 关闭编译日志
  historyApiFallback: true,
  compress: true,
}

const hotClient = ['webpack-dev-server/client', 'webpack/hot/only-dev-server']
if (typeof webpackConfig.entry == 'object') {
  Object.keys(webpackConfig.entry).forEach(name => {
    const value = webpackConfig.entry[name]
    if (Array.isArray(value)) {
      value.unshift(...hotClient)
    } else {
      webpackConfig.entry[name] = [...hotClient, value]
    }
  })
} else {
  webpackConfig.entry = [...hotClient, webpackConfig.entry]
}
WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions)

console.log(chalk.cyan('\nStarting the development server...\n'))

const webpackCompiler = webpack(webpackConfig)

const server = new WebpackDevServer(webpackCompiler, devServerOptions)

server.listen(port, host, err => {
  if (err) {
    return console.info(chalk.red(err.trace()))
  } else {
    console.log(`Server local at ${chalk.magenta.underline(`http://${host}:${port}${publicPath}`)}`)
  }
})
