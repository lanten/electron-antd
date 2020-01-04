import chalk from 'chalk'
import webpack from 'webpack'
import electron from 'electron'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import WebpackDevServer from 'webpack-dev-server'

import { exConsole } from '../utils'
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

let electronProcess: ChildProcessWithoutNullStreams | undefined

function startMain() {
  return new Promise(resolve => {
    const mainCompiler = webpack(webpackConfigMain, (err, stats) => {
      if (err) {
        throw err
      }

      // process.stdout.write(
      //   stats.toString({
      //     colors: true,
      //     hash: true,
      //     version: true,
      //     timings: true,
      //     assets: true,
      //     chunks: false,
      //     children: false,
      //     modules: false,
      //   }) + '\n\n'
      // )

      if (electronProcess && electronProcess.kill) {
        try {
          process.kill(electronProcess.pid)
        } catch (error) {
          exConsole.error(chalk.red(`Kill electron process: ${electronProcess.pid} failed.`))
        }
        startElectron()
      }

      if (stats.hasErrors()) {
        throw new Error(stats.toString())
      } else {
        resolve(mainCompiler)
      }
    })
  })
}

function startRenderer(): Promise<void> {
  return new Promise(resolve => {
    process.env.port = String(devConfig.port)
    process.env.host = devConfig.host

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
      exConsole.info(`Server local at ${chalk.magenta.underline(`http://${host}:${port}${publicPath}`)}`)
      resolve()
    })

    const server = new WebpackDevServer(rendererCompiler, devServerOptions)

    server.listen(port, host, err => {
      if (err) {
        exConsole.error(chalk.red(err.message))
      }
    })
  })
}

function startElectron() {
  // @ts-ignore
  electronProcess = spawn(electron, ['.'])
  if (!electronProcess) throw new Error('electron start error!')
  electronProcess.on('close', () => {
    electronProcess = undefined
    // process.exit()
  })
}

async function startDevServer() {
  await startRenderer()

  await startMain()
  startElectron()
}

startDevServer()
