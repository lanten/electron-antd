import chalk from 'chalk'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import devConfig from '../dev.config'
import webpackConfigRenderer from '../webpack.config.renderer'
import webpackConfigMain from '../webpack.config.main'

process.env.NODE_ENV = 'development'

const { env, port, host, proxy } = devConfig
const publicPath = env.dev.publicPath
const devServerOptions: WebpackDevServer.Configuration = {
  host,
  publicPath,
  disableHostCheck: true,
  hot: true,
  noInfo: true,
  proxy: proxy,
  // quiet: true, // 完全关闭编译日志
  clientLogLevel: 'warn',
  historyApiFallback: true,
  compress: true,
}

function startElectron() {
  // const mainCompiler = webpack(webpackConfigMain)
}

function startRenderer(): Promise<void> {
  return new Promise(resolve => {
    const hotClient = ['webpack-dev-server/client', 'webpack/hot/only-dev-server']
    if (typeof webpackConfigRenderer.entry === 'object') {
      Object.keys(webpackConfigRenderer.entry).forEach(name => {
        if (!webpackConfigRenderer.entry) throw new Error(webpackConfigRenderer.entry)
        const value = webpackConfigRenderer.entry[name]
        if (Array.isArray(value)) {
          value.unshift(...hotClient)
        } else {
          webpackConfigRenderer.entry[name] = [...hotClient, value]
        }
      })
    } else {
      webpackConfigRenderer.entry = [...hotClient, webpackConfigRenderer.entry] as string[]
    }
    WebpackDevServer.addDevServerEntrypoints(webpackConfigRenderer, devServerOptions)

    const rendererCompiler = webpack(webpackConfigRenderer)
    rendererCompiler.hooks.done.tap('done', stats => {
      console.log(`Server local at ${chalk.magenta.underline(`http://${host}:${port}${publicPath}`)}`)
      resolve()
    })

    const server = new WebpackDevServer(rendererCompiler, devServerOptions)

    server.listen(port, host, err => {
      if (err) {
        console.log(chalk.red(err.message))
      }
    })
  })
}

startRenderer().then(startElectron)
