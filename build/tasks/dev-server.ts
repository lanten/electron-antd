import chalk from 'chalk'
import webpack from 'webpack'

import WebpackDevServer, { Configuration } from 'webpack-dev-server'

import { exConsole } from '../utils'
import ElectronProcess from './electron-process'
import devConfig from '../dev.config'
import webpackConfigRenderer from '../webpack.config.renderer'
import webpackConfigMain from '../webpack.config.main'

process.env.NODE_ENV = 'development'
/** 禁用 electron warning */
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const { port, host, proxy } = devConfig
const devServerOptions: WebpackDevServer.Configuration = {
  host,
  disableHostCheck: true,
  hot: true,
  noInfo: true,
  proxy: proxy,
  clientLogLevel: 'warn',
  historyApiFallback: true,
  compress: true,
}

const electronProcess = new ElectronProcess()

/**
 * 启动主进程编译服务
 */
function startMain(): Promise<webpack.Stats> {
  return new Promise(resolve => {
    webpackConfigMain.devtool = 'source-map'
    webpackConfigMain.watch = true
    webpackConfigMain.watchOptions = {
      ignored: ['**/*.tsx', '**/*.jsx', '**/*.less', '**/*.css'],
    }
    webpack(webpackConfigMain, (err, stats) => {
      if (err) {
        throw err
      }

      if (stats.hasErrors()) {
        exConsole.error(stats.toString())
      } else {
        electronProcess.start()
        resolve(stats)
      }
    })
  })
}

/**
 * 启动渲染进程编译服务
 */
function startRenderer(): Promise<webpack.Stats> {
  return new Promise(resolve => {
    process.env.port = String(devConfig.port)
    process.env.host = devConfig.host

    const hotClient = ['webpack-dev-server/client', 'webpack/hot/only-dev-server']
    if (typeof webpackConfigRenderer.entry === 'object') {
      Object.keys(webpackConfigRenderer.entry).forEach(name => {
        if (!webpackConfigRenderer.entry) throw new Error('webpackConfigRenderer.entry')
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
    WebpackDevServer.addDevServerEntrypoints(webpackConfigRenderer as Configuration, devServerOptions)

    webpackConfigRenderer.devtool = 'source-map'

    const rendererCompiler = webpack(webpackConfigRenderer)
    rendererCompiler.hooks.done.tap('done', stats => {
      exConsole.success(`Server renderer start at ${chalk.magenta.underline(`http://${host}:${port}`)}`)
      resolve(stats)
    })

    // @ts-ignore
    const server = new WebpackDevServer(rendererCompiler, devServerOptions)

    server.listen(port, host, (err: Error) => {
      if (err) {
        exConsole.error(err)
      }
    })
  })
}

async function startDevServer() {
  exConsole.info(`${process.env.BUILD_ENV} starting...`)
  await startRenderer()
  await startMain()
}

startDevServer()
