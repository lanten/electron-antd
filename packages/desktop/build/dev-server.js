import path from 'path'
import chalk from 'chalk'
import { spawn } from 'child_process'
import chokidar from 'chokidar'
import electron from 'electron'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackHotMiddleware from 'webpack-hot-middleware'

import { port, source } from '../config/dev.config'

process.env.NODE_ENV = 'development'
const webpackConfig = require('../config/webpack.config')

let electronProcess = null
let manualRestart = false
let hotMiddleware

function startRenderer() {
  return new Promise((resolve, reject) => {

    webpackConfig.devtool = 'source-map'
    const hotclient = ['webpack-hot-middleware/client?noInfo=true&reload=true']

    if (typeof webpackConfig.entry == 'object') {
      Object.keys(webpackConfig.entry).forEach((name) => {
        const value = webpackConfig.entry[name]
        if (Array.isArray(value)) {
          value.unshift(...hotclient)
        } else {
          webpackConfig.entry[name] = [...hotclient, value]
        }
      })
    } else {
      webpackConfig.entry = [...hotclient, webpackConfig.entry]
    }

    const webpackCompiler = webpack(webpackConfig)
    hotMiddleware = webpackHotMiddleware(webpackCompiler, {
      log: false,
      heartbeat: 2500
    })

    // 启用 dev-server
    const server = new WebpackDevServer(
      webpackCompiler,
      {
        contentBase: source,
        historyApiFallback: {
          index: 'index.html',
        },
        quiet: true, // 隐藏日志
        before(app, ctx) {
          app.use(hotMiddleware)
          ctx.middleware.waitUntilValid((err) => {
            console.log(`dev-server at ${chalk.magenta.underline(`http://localhost:${port}`)}`)
            resolve()
          })
        },
      }
    )
    server.listen(port)
  })
}

function startElectron() {
  electronProcess = spawn(electron, ['.'])

  electronProcess.stdout.on('data', data => {
    electronLog(data, 'Electron', 'blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'Electron', 'yellow')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}


function electronLog(data, type, color = 'gray') {
  console.log(chalk[color](`\n┏ ---------------------------- [${type}] `))
  console.log(chalk[color](data))
  console.log(chalk[color](`┗ ----------------------------`))
}

startRenderer().then(() => {
  startElectron()
}).catch(err => {
  console.error(err)
})

const watcher = chokidar.watch(path.join(__dirname, '../electron'), {
  ignored: /(^|[\/\\])\../,
  persistent: true
})

watcher.on('all', (path) => {
  if (electronProcess && electronProcess.kill) {
    manualRestart = true
    process.kill(electronProcess.pid)
    electronProcess = null
    startElectron()

    setTimeout(() => {
      manualRestart = false
    }, 5000)
  }
})