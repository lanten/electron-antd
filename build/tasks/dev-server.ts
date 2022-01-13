import pc from 'picocolors'
import webpack from 'webpack'

import WebpackDevServer from 'webpack-dev-server'

import { exConsole } from '../utils'
import ElectronProcess from './electron-process'
import buildConfig from '../config'
import webpackConfigRenderer from '../webpack.config.renderer'
import webpackConfigMain from '../webpack.config.main'

process.env.NODE_ENV = 'development'
/** 禁用 electron warning */
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const { port, host, proxy } = buildConfig
const devServerOptions: WebpackDevServer.Configuration = {
  host,
  port,
  hot: true,
  proxy: proxy,
  historyApiFallback: true,
  compress: true,
  allowedHosts: 'all',
  static: buildConfig.static,
  client: {
    logging: 'warn',
    overlay: true,
    progress: true,
  },
  devMiddleware: {
    publicPath: '',
  },
}

const electronProcess = new ElectronProcess()

/**
 * 启动主进程编译服务
 */
function startMain(): Promise<webpack.Stats> {
  return new Promise((resolve) => {
    webpackConfigMain.devtool = 'source-map'
    webpackConfigMain.watch = true
    webpackConfigMain.watchOptions = {
      ignored: ['**/*.tsx', '**/*.jsx', '**/*.less', '**/*.css'],
    }
    webpack(webpackConfigMain, (err, stats) => {
      if (err) throw err
      if (!stats) throw 'Webpack states error!'

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
  return new Promise((resolve) => {
    process.env.port = String(buildConfig.port)
    process.env.host = buildConfig.host

    const rendererCompiler = webpack(webpackConfigRenderer)
    rendererCompiler.hooks.done.tap('done', (stats) => {
      exConsole.success(`Server renderer start at ${pc.underline(pc.magenta(`http://${host}:${port}`))}`)
      resolve(stats)
    })

    const server = new WebpackDevServer(devServerOptions, rendererCompiler)

    server.start().catch((err) => {
      if (err) {
        exConsole.error('Dev Server failed to activate.', err)
      }
    })
  })
}

async function startDevServer() {
  exConsole.info(`${process.env.BUILD_ENV} starting...`)
  startRenderer()
  startMain()
}

startDevServer()
